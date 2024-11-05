<script lang="ts">
	import { COLORS } from '$lib/colors';
	import Cube from './cube.svelte';
	import Cuboid from './cuboid.svelte';
	import Triangle from './triangle.svelte';

	let object = $props();
</script>

{#if object.type === 'emitter'}
	<Cube bind:position={object.position} border={false} filled={true} fillColor={COLORS.blue} />
{:else if object.type === 'cube'}
	<Cube bind:position={object.position} border={false} filled={true} fillColor={COLORS.gray} />
{:else if object.type === 'triangle'}
	<Triangle bind:position={object.position} border={false} filled={true} fillColor={COLORS.gray} />
{:else if object.type === 'detector'}
	<Cube
		bind:position={object.position}
		border={true}
		borderColor={COLORS.blue}
		filled={true}
		fillColor={COLORS.transparent}
	/>
{:else if object.type === 'mirror'}
	<Cuboid
		bind:position={object.position}
		bind:rotation={object.rotation}
		cubeAProps={{ filled: true, fillColor: COLORS.gray }}
		cubeBProps={{ filled: true, fillColor: COLORS.gray }}
	/>
{:else if object.type === 'splitter'}
	<Cuboid
		bind:position={object.position}
		bind:rotation={object.rotation}
		cubeAProps={{ filled: true, fillColor: COLORS.gray }}
		cubeBProps={{
			filled: true,
			fillColor: COLORS.transparent,
			border: true,
			borderColor: COLORS.gray
		}}
	/>
{:else if object.type === 'glass'}
	<Cube
		bind:position={object.position}
		scale={1}
		border={true}
		borderColor={COLORS.gray}
		filled={true}
		fillColor={COLORS.transparent}
	/>
{:else if object.type === 'photon'}
	<Cube
		bind:position={object.position}
		scale={0.5}
		border={true}
		borderColor={COLORS.blue}
		filled={true}
		fillColor={COLORS.transparent}
	/>
{:else}
	<p>Unknown object type: {object.type}</p>
{/if}
