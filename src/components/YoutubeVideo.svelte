<script>

    import { onMount, onDestroy } from 'svelte';
    import YouTubePlayer from 'youtube-player';

    export let song;

    let player;
    let currentLyric = '...';
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
        await injectBefore(1, 'Go!');
        await injectBefore(2, 'Ready?');
        player = await YouTubePlayer('player', {
            width: '600',
            height: '400',
            videoId: song.youtubeId
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

<svelte:head>
    <title>Playing {song.title} by {song.artist} - Karaom</title>
</svelte:head>

<div class="section">
    <button class="button is-info" on:click={() => song = undefined}>Back</button>
    <div class="has-text-centered">
        <h1 class="title">{song.title} by {song.artist}</h1>
        <div class="section">
            <div id="player"></div>
        </div>
        <div class="section">
            <h2 class="title">{currentLyric}</h2>
        </div>
        <a href="https://github.com/Karaom/karaom-public/issues/new?title=%5BLyric%20issue%5D%20Music%20{song.title}%20by%20{song.artist}&body=**Explain%20the%20issue%20you%20have%20here:**%20" class="button is-small is-danger">Any issue with lyrics? Report it here</a>
    </div>
</div>