<script lang="ts">
	interface DotsProps {
		count: number;
	}

	let { count = 9 }: DotsProps = $props();
</script>

<h1>Dots</h1>
{#each Array.from({ length: count }) as _}
	<div class="h-1 w-1 rounded bg-gray-700"></div>
{/each}
