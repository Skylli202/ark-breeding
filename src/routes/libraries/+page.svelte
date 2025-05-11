<script>
	import UiLayout from '$lib/components/ui-layout.svelte';
	import WorkInProgress from '$lib/components/work-in-progress.svelte';
</script>

<UiLayout>
	{#snippet header()}{/snippet}

	{#snippet content()}
		<WorkInProgress />
	{/snippet}
</UiLayout>
