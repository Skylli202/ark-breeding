<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<Sidebar.Provider>
	<AppSidebar session={data.session} />
	<main class="flex-1">
		{@render children?.()}
	</main>
</Sidebar.Provider>
