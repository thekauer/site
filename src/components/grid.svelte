<script lang="ts">
	import type { Snippet } from 'svelte';

	interface DotsProps {
		width: number;
		height: number;
		children: Snippet<[]>;
	}

	let { width = 13, height = 13, children }: DotsProps = $props();
</script>

{@render children()}
<div class="floor">
	{#each Array.from({ length: width }) as _, i}
		<div class="row">
			{#each Array.from({ length: height }) as _, j}
				<div class="tile"></div>
			{/each}
		</div>
	{/each}
</div>

<style>
	.floor .tile {
		font-size: 11pt;
		color: #ccc;
		display: inline-block;
		background: #111;
		width: 48px;
		height: 48px;
		margin: 0;
		box-shadow: 0 0 0 0.1em hsla(0, 0%, 0%, 0.2);
		border: solid 1px gray;
		line-height: 48px;
		text-align: center;
		position: relative;
		vertical-align: top;
	}
	.floor .tile:hover {
		background: #333;
		transform: translateX(-15px) translateY(-15px);
		transition: all 0.2s;
	}

	@keyframes fallanddie {
		from {
			z-index: -1;
			opacity: 1;
			transform: translateZ(0);
		}
		to {
			opacity: 0;
			transform: translateZ(-150px);
		}
	}
</style>
