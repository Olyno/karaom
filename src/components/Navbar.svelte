<script>

    let isActive = false;

</script>

<nav class="navbar">
    <div class="navbar-brand">
        <a href="#!" class="navbar-burger burger" class:is-active={isActive} on:click|preventDefault={() => isActive = !isActive }>
            <span></span>
            <span></span>
            <span></span>
        </a>
    </div>
    <div class="navbar-menu" class:is-active={isActive}>
        <div class="navbar-start">
            
        </div>
        <div class="navbar-end">
            <div class="navbar-item">
                <div class="buttons">
                    <a href="https://github.com/Karaom/karaom-public/issues?q=is%3Aissue+is%3Aopen+sort%3Aupdated-desc" target="_blank" class="button is-primary">A problem?</a>
                    <a href="https://github.com/Karaom/karaom" target="_blank" class="button is-dark"><i class="fab fa-github"></i></a>
                </div>
            </div>
        </div>
    </div>
</nav>