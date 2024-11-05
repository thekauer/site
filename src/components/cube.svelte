<script lang="ts">
	import { COLORS } from '$lib/colors';

	interface CubeProps {
		position?: { x: number; y: number; z: number };
		offset?: { x: number; y: number; z: number };
		scale?: number;
		fillColor?: string;
		filled?: boolean;
		borderColor?: string;
		border?: boolean;
	}

	let ref: HTMLDivElement;
	let {
		position = $bindable({ x: 0, y: 0, z: 0 }),
		offset = { x: 0, y: 0, z: 0.5 },
		scale = 1,
		filled = true,
		border = false,
		borderColor = COLORS.transparent,
		fillColor = COLORS.transparent
	}: CubeProps = $props();

	$effect(() => {
		ref.style.setProperty('--x', `${position.x}`);
		ref.style.setProperty('--y', `${position.y}`);
		ref.style.setProperty('--z', `${position.z || 0}`);
		ref.style.setProperty('--scale', `${scale}`);
		ref.style.setProperty('--border-color', borderColor);
		ref.style.setProperty('--fill-color', fillColor);
		ref.style.setProperty('--offset-x', `${offset.x}`);
		ref.style.setProperty('--offset-y', `${offset.y}`);
		ref.style.setProperty('--offset-z', `${offset.z}`);
	});
</script>

<div class="cube" class:filled class:border bind:this={ref}>
	<div class="cube__face cube__face--front"></div>
	<div class="cube__face cube__face--back"></div>
	<div class="cube__face cube__face--right"></div>
	<div class="cube__face cube__face--left"></div>
	<div class="cube__face cube__face--top"></div>
	<div class="cube__face cube__face--bottom"></div>
</div>

<style>
	.cube {
		--edge: 24px;
		--scale: 1;
		--x: 0;
		--y: 0;
		--z: 0;
		--offset-x: 0;
		--offset-y: 0;
		--offset-z: 0.5;
		width: 100%;
		height: 100%;
		position: relative;
		transform-style: preserve-3d;
		border-width: 0;
		transition: transform 0.3s;
		transform: translate3d(
			calc(2 * var(--edge) * var(--x) + 2 * var(--edge) * var(--offset-x)),
			calc(2 * var(--edge) * var(--y) + 2 * var(--edge) * var(--offset-y)),
			calc(2 * var(--edge) * var(--z) + 2 * var(--edge) * var(--offset-z))
		);
	}

	.cube__face {
		position: absolute;
		width: calc(var(--edge) * 2 * var(--scale));
		height: calc(var(--edge) * 2 * var(--scale));
		transition: transform 1s;
	}

	.cube.border .cube__face {
		border: 1px dashed var(--border-color);
	}

	.cube.filled .cube__face {
		background-color: var(--fill-color);
	}

	.cube__face--front {
		transform: rotateY(0deg) translateZ(calc(var(--edge) * var(--scale)));
	}
	.cube__face--right {
		transform: rotateY(90deg) translateZ(calc(var(--scale) * var(--edge)));
	}
	.cube__face--back {
		transform: rotateY(180deg) translateZ(calc(var(--edge) * var(--scale)));
	}
	.cube__face--left {
		transform: rotateY(-90deg) translateZ(calc(var(--edge) * var(--scale)));
	}
	.cube__face--top {
		transform: rotateX(90deg) translateZ(calc(var(--edge) * var(--scale)));
	}
	.cube__face--bottom {
		transform: rotateX(-90deg) translateZ(calc(var(--scale) * var(--edge)));
	}

	.cube__face--front {
		background: hsla(0, 100%, 50%, 0.7);
	}
	.cube__face--right {
		background: hsla(60, 100%, 50%, 0.7);
	}
	.cube__face--back {
		background: hsla(120, 100%, 50%, 0.7);
	}
	.cube__face--left {
		background: hsla(180, 100%, 50%, 0.7);
	}
	.cube__face--top {
		background: hsla(240, 100%, 50%, 0.7);
	}
	.cube__face--bottom {
		background: hsla(300, 100%, 50%, 0.7);
	}
</style>
