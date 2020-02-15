<script>

	import SongCard from './SongCard.svelte';

	export let songs;
	export let show;
	export let size;
	export let cardSize;
	export let isSongsQueue;

	let searchingSong = '';

	$: searchingSongs = songs.filter(song => song.title.toLowerCase().includes(searchingSong) || song.artist.toLowerCase().includes(searchingSong));

</script>

<style>
	.wrap { flex-wrap: wrap; }
	.small-section { padding: 1rem 1.5rem !important }
</style>

<div class="has-text-centered">

	<div class="columns is-centered">
		<div class="column {size === 'large' ? 'is-4' : ''}">
			<input class="input" type="text" bind:value={searchingSong} placeholder="Search a music title or artist...">
		</div>
	</div>

</div>

{#if size === 'large'}
	<div class="section">
		<div class="columns wrap">
			{#each searchingSongs as song}
				<div class="column is-4">
					<SongCard {song} {isSongsQueue} size={cardSize} class="animated bounceInUp" />
				</div>
			{/each}
		</div>
	</div>
{:else if size === 'small'}
	<div class="columns wrap">
		{#each searchingSongs as song, index}
			{#if index < show || !show}
				<div class="column is-6">
					<SongCard {song} {isSongsQueue} size={cardSize} class="animated bounceInUp" />
				</div>
			{/if}
		{/each}
	</div>
{:else}
	{#each searchingSongs as song, index}
		{#if index < show || !show}
			<div class="small-section">
				<SongCard {song} {isSongsQueue} size={cardSize} class="animated bounceInUp" />
			</div>
		{/if}
	{/each}
{/if}
