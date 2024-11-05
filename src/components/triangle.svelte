<script lang="ts">
	import { COLORS } from '$lib/colors';

	interface TriangleProps {
		position?: { x: number; y: number; z: number };
		scale?: number;
		fillColor?: string;
		filled?: boolean;
		borderColor?: string;
		border?: boolean;
	}

	let ref: HTMLDivElement;
	let {
		position = $bindable({ x: 0, y: 0, z: 0 }),
		scale = 1,
		filled = true,
		border = true,
		borderColor = COLORS.gray,
		fillColor = COLORS.transparent
	}: TriangleProps = $props();

	$effect(() => {
		ref.style.setProperty('--x', `${position.x}`);
		ref.style.setProperty('--y', `${position.y}`);
		ref.style.setProperty('--z', `${position.z || 0}`);
		ref.style.setProperty('--scale', `${scale}`);
		ref.style.setProperty('--border-color', borderColor);
		ref.style.setProperty('--fill-color', fillColor);
	});
</script>

<div class="triangle" bind:this={ref} class:border>
	<div class="top">
		<div class="face front"></div>
		<div class="face back"></div>
		<div class="face left"></div>
		<div class="face right"></div>
	</div>
	<div class="face base"></div>
</div>

<style>
	.triangle {
		--edge: 24px;
		--scale: 1;
		--x: 0;
		--y: 0;
		--z: 0;

		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		border-width: 0;
		transform: translate3d(
			calc(2 * var(--edge) * var(--x)),
			calc(2 * var(--edge) * var(--y)),
			calc(2 * var(--edge) * var(--z))
		);
	}

	.top {
		transform-style: preserve-3d;
		transform: translateZ(41px) translateY(24px);
	}

	.face {
		position: absolute;
		width: var(--edge);
		aspect-ratio: 1;
		clip-path: polygon(50% 0%, 100% 100%, 0% 100%);
		background: var(--fill-color);
		width: calc(var(--edge) * 2 * var(--scale));
		height: calc(var(--edge) * 2 * var(--scale));
		transform-origin: 50% 0%;
	}

	.base {
		clip-path: none;
		background: var(--fill-color);
	}

	.triangle.border .face {
		border: 0px dashed var(--border-color);
	}

	.triangle.border .base {
		border: 1px dashed var(--border-color);
	}

	.face.front {
		transform: rotateZ(90deg) rotateX(-60deg) translateZ(calc(0 * var(--edge) * var(--scale)));
	}
	.face.back {
		transform: rotateZ(-90deg) rotateX(-60deg) translateZ(calc(0 * var(--edge) * var(--scale)));
	}
	.face.right {
		transform: rotateX(60deg) rotateZ(180deg) translateZ(calc(0 * var(--scale) * var(--edge)));
	}
	.face.left {
		transform: rotateX(-60deg) translateZ(calc(0 * var(--edge) * var(--scale)));
	}
	.face.base {
		transform: rotateY(0deg);
		transform-origin: center center;
	}
</style>
