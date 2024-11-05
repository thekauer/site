<script lang="ts">
	import type { Snippet } from 'svelte';

	interface SceneProps {
		children: Snippet<[]>;
	}

	let { children }: SceneProps = $props();
</script>

<div class="scene">
	{@render children()}
</div>

<style>
	.scene {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) rotateX(55deg) rotateZ(45deg);
		transform-style: preserve-3d;
		font-size: 0;
		perspective: 1000px;
	}
</style>
