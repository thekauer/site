<script lang="ts">
	import { SOLUTION } from '$lib/consts';
	import { update, type Game } from '$lib/game';
	import { onDestroy, onMount } from 'svelte';
	import Cuboid from './cuboid.svelte';
	import Grid from './grid.svelte';
	import Object from './object.svelte';
	import Scene from './scene.svelte';

	let game: Game = $state({ entities: SOLUTION, width: 13, height: 13, time: 0 });

	let interval: number;
	onMount(() => {
		interval = setInterval(() => {
			console.log(game.entities.filter((object) => object.type === 'photon').length);

			game = update(game);
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(interval);
	});
</script>

<Scene>
	<Grid width={game.width} height={game.height}>
		<Cuboid position={{ x: 11, y: 12, z: 0 }} rotation={1} />
		<Object type="photon" position={{ x: 0, y: 0 }} />
		{#each game.entities as object}
			<Object {...object} />
		{/each}
	</Grid>
</Scene>
