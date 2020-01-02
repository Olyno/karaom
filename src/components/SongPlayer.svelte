<script>

    import { onMount, onDestroy } from 'svelte';
    import YouTubePlayer from 'youtube-player';

    export let song;
    export let currentLyric;

    let player;
    let currentTimeFunction,
        currentMilliseconds = 0,
        milliseconds = 0,
        seconds = 0,
        minutes = 0;

    function injectBefore(scds, text) {
        const startTime = new Number(Object.keys(song.time)[0].split('.')[0].split(':')[1]);
        const time = `00:${scds < 10 ? '0' : ''}${startTime - scds}.00`;
        song.time[time] = text;
    }

    onMount(async () => {
        injectBefore(1, 'Go!');
        injectBefore(2, 'Ready?');
        player = await YouTubePlayer('player', {
            width: '600',
            height: '400',
            videoId: song.youtubeId,
            playerVars: {
                iv_load_policy: 3
            }
        });
        player.playVideo()
            .then(video => {
                currentTimeFunction = setInterval(() => {
                    currentMilliseconds = video.getCurrentTime();
                    milliseconds = new Number(currentMilliseconds.toFixed(2).split('.')[1]);
                    seconds = Math.floor(currentMilliseconds % 60);
                    minutes = Math.floor(new Number(currentMilliseconds.toFixed(1).split('.')[0]) / 60);
                    if (milliseconds < 10) milliseconds = '0' + milliseconds;
                    if (seconds < 10) seconds = '0' + seconds;
                    if (minutes < 10) minutes = '0' + minutes;
                    if (song.time[`${minutes}:${seconds}.${milliseconds}`]) {
                        currentLyric = song.time[`${minutes}:${seconds}.${milliseconds}`];
                    }
                }, 10);
            })
    })

    onDestroy(async () => {
        clearInterval(currentTimeFunction);
    })

</script>

<div id="player"></div>