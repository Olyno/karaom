<script>

    import { afterUpdate } from 'svelte'
    import { setupImages } from 'utils';
    import { songsQueue } from '../stores/player';

    let clazz;
    let songBanner = 'data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

    export let song;
    export let size;
    export let isSongsQueue;
    export { clazz as class };

    afterUpdate(async () => songBanner = `https://img.youtube.com/vi/${song.youtubeId}/hqdefault.jpg`);

</script>

<div class="card {clazz}">
    <div class="card-image">
        <figure class="image is-4by3">
            <img src={songBanner} alt="Song banner">
        </figure>
    </div>
    <div class="card-content">
        <div class="media">
            <div class="media-content">
                <p class="title is-4">{song.title}</p>
                <p class="subtitle is-6">@{song.artist}</p>
            </div>
        </div>
    </div>
    <div class="card-footer">
        {#if isSongsQueue}
            <div class="card-footer-item">
                <a
                    href="music/{song.title.toLowerCase().replace(/\s(\w+)/g, '-$1')}"
                    on:click={() => $songsQueue = $songsQueue.filter(s => s !== song.youtubeId)}
                    class="button is-info"
                    class:is-small={size === 'small'}
                    class:is-normal={size === 'normal'}
                    class:is-medium={size === 'medium'}
                    class:is-large={size === 'large'}
                >Play it now!</a>  
            </div>
            <div class="card-footer-item">
                <button
                    on:click={() => $songsQueue = $songsQueue.filter(s => s !== song.youtubeId)}
                    class="button is-danger"
                    class:is-small={size === 'small'}
                    class:is-normal={size === 'normal'}
                    class:is-medium={size === 'medium'}
                    class:is-large={size === 'large'}
                >Remove from queue!</button>
            </div>
        {:else}
            <div class="card-footer-item">
                <a
                    href="music/{song.title.toLowerCase().replace(/\s(\w+)/g, '-$1')}"
                    class="button is-info"
                    class:is-small={size === 'small'}
                    class:is-normal={size === 'normal'}
                    class:is-medium={size === 'medium'}
                    class:is-large={size === 'large'}
                >Play it now!</a>  
            </div>
            <div class="card-footer-item"> 
                <button
                    on:click={() => $songsQueue = [...$songsQueue, song.youtubeId]}
                    class="button is-dark"
                    class:is-small={size === 'small'}
                    class:is-normal={size === 'normal'}
                    class:is-medium={size === 'medium'}
                    class:is-large={size === 'large'}
                >Add to queue!</button>
            </div>
        {/if}
    </div>
</div>