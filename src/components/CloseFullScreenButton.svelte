<script>

    import { isFullScreen } from '../stores/player';

    async function closeFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        $isFullScreen = false;
    }

</script>

<button class="button is-dark" on:click={closeFullscreen}>Leave Full Screen</button>