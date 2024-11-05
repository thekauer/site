<script lang="ts">
	import { COLORS } from '$lib/colors';
	import Cube from './cube.svelte';

	interface CuboidProps {
		position?: { x: number; y: number; z: number };
		rotation?: number;
		cubeAProps?: CubeProps;
		cubeBProps?: CubeProps;
	}

	interface CubeProps {
		fillColor?: string;
		filled?: boolean;
		borderColor?: string;
		border?: boolean;
	}

	let ref: HTMLDivElement;
	let {
		position = $bindable({ x: 0, y: 0, z: 0 }),
		rotation = $bindable(0),
		cubeAProps = { filled: true, fillColor: COLORS.gray },
		cubeBProps = {
			filled: true,
			fillColor: COLORS.transparent,
			border: true,
			borderColor: COLORS.gray
		}
	}: CuboidProps = $props();

	$effect(() => {
		ref.style.setProperty('--x', `${position.x}`);
		ref.style.setProperty('--y', `${position.y}`);
		ref.style.setProperty('--z', `${position.z || 0}`);
		ref.style.setProperty('--rotation', `${rotation}`);
	});
</script>

<div class="cuboid" bind:this={ref}>
	<Cube
		position={{ x: 0, y: 0, z: 0 }}
		scale={0.5}
		offset={{ x: 0.25, y: 0.5, z: 0.25 }}
		{...cubeAProps}
	/>
	<Cube
		position={{ x: 0, y: 0, z: 0 }}
		scale={0.5}
		offset={{ x: 0.25, y: 0, z: 0.25 }}
		{...cubeBProps}
	/>
</div>

<style>
	.cuboid {
		--edge: 24px;
		--x: 0;
		--y: 0;
		--z: 0;
		position: relative;
		transform-style: preserve-3d;
		transform-origin: var(--edge) var(--edge);
		transform: translate3d(
				calc(2 * var(--edge) * var(--x)),
				calc(2 * var(--edge) * var(--y)),
				calc(2 * var(--edge) * var(--z))
			)
			rotateZ(calc(45deg * var(--rotation)));
	}
</style>
