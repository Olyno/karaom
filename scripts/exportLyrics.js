const fs = require('fs');
const path = require('path');

const lyricsPath = __dirname + '/../src/lyrics';

const lyricsExport =  [];
let lyrics = '';

const input = 'lyrics';
const output = 'bundle';

async function convertLyrics() {
    return new Promise((resolve, rejects) => {
        fs.readdir(path.resolve(lyricsPath, input), (err, files) => {
            if (err) rejects(err);
            for (const file of files) {
                const fileName = file.replace(/\.\w+$/g, '').replace(/\s/g, '_').replace(/-/g, '_');
                const content = fs.readFileSync(path.resolve(lyricsPath, input, file)).toString();
                const back = {time: {}};
                const lines = content.toString().split('\n');
                for (const line of lines) {
                    if (/\[[0-9][0-9]\:[0-9][0-9]\.[0-9][0-9]\]/g.test(line)) {
                        const parts = line.split(']');
                        back.time[parts[0].replace(/\[/g, '')] = parts[1];
                    } else {
                        const parts = line.replace(/\[?\]?/g, '').split(':');
                        if (parts[0] === 'ar') parts[0] = 'artist';
                        if (parts[0] === 'ti') parts[0] = 'title';
                        if (parts[0] === 've') parts[0] = 'version';
                        if (parts[0] === 'yt') {
                            parts[0] = 'youtubeId';
                            parts[1] = parts[2].split('watch?v=')[1].replace(/\s/g, '');
                        }
                        back[parts[0]] = parts[1];
                    }
                }
                if (!fs.existsSync(`${lyricsPath}/${output}`)) fs.mkdirSync(`${lyricsPath}/${output}`);
                fs.writeFileSync(`${lyricsPath}/${output}/${fileName}.js`, `export default ${JSON.stringify(back)}`);
            }
            resolve();
        })
    })
}

async function exportLyrics() {
    return new Promise((resolve, rejects) => {
        fs.readdir(path.resolve(lyricsPath, output), (err, files) => {
            if (err) rejects(err);
            for (const file of files) {
                const fileName = file.replace(/\.\w+$/g, '').replace(/\s/g, '_').replace(/-/g, '_');
                lyrics += `\nimport ${fileName} from './${output}/${fileName}';`;
                lyricsExport.push(fileName);
            }
            fs.writeFileSync(lyricsPath + '/lyrics.js', lyrics + `\nexport default [ ${lyricsExport.join(', ')} ];`);
            resolve();
        })
    })
}

convertLyrics()
    .then(() => {
        exportLyrics()
            .catch(err => {throw err})
    })
    .catch(err => {throw err})