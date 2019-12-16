<script context="module">

	import lyrics from '../lyrics/lyrics';

	export async function preload(page, session) {
		return { songs: lyrics };
	}

</script>

<script>

	import { onMount } from 'svelte';

	import Card from '../components/Card.svelte';
	import YoutubeVideo from '../components/YoutubeVideo.svelte';

	export let songs = [];
	export let error;

	let searchingSong = '',
		currentSong;

	$: searchingSongs = songs.filter(song => song.title.toLowerCase().includes(searchingSong) || song.artist.toLowerCase().includes(searchingSong));

	async function played(e) {
		currentSong = e.detail.song;
	}

</script>

<style>
	.wrap { flex-wrap: wrap; }
</style>

<svelte:head>
	<title>Search a song - Karaom</title>
</svelte:head>

{#if !currentSong}

	<div class="has-text-centered section">
		<h1 class="title">Karaom</h1>
		<h1 class="subtitle">Have fun with a free Karaoke</h1>
	</div>

	<div class="has-text-centered section">

		{#if error}
			<div class="section">
				<article class="message is-danger">
					<div class="message-header">
						<p>Error</p>
					</div>
					<div class="message-body">
						<p>{error}</p>
					</div>
				</article>
			</div>
		{/if}

		<div class="columns is-centered">
			<div class="column is-4">
				<input class="input" type="text" bind:value={searchingSong} placeholder="Search a music title or artist...">
			</div>
		</div>	

	</div>

	<div class="section">
		<div class="columns wrap">
			{#each searchingSongs as song}
				<div class="column is-4">
					<Card {song} on:play={played} />
				</div>
			{/each}
		</div>
	</div>

{:else}

	<YoutubeVideo bind:song={currentSong} />

{/if}