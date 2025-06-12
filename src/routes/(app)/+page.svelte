<script>
	import UiLayout from '$lib/components/ui-layout.svelte';
</script>

<UiLayout>
	{#snippet header()}{/snippet}

	{#snippet content()}
		<p>This is the preview environment.</p>
	{/snippet}
</UiLayout>
