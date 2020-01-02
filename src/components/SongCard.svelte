<script>

    let clazz;

    export let song;
    export { clazz as class };

</script>

<div class="card {clazz}">
    <div class="card-image">
        <figure class="image is-4by3">
            <img src="https://img.youtube.com/vi/{song.youtubeId}/hqdefault.jpg" alt="Hit image">
        </figure>
    </div>
    <div class="card-content">
        <div class="media">
            <div class="media-content">
                <p class="title is-4">{song.title}</p>
                <p class="subtitle is-6">@{song.artist}</p>
            </div>
        </div>
        <div class="content has-text-centered">
            <a href="music/{song.title.toLowerCase().replace(/\s(\w+)/g, '-$1')}" class="button is-info">Play it now!</a>
        </div>
    </div>
</div>