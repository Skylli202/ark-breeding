<script lang="ts">
	import '../../app.css';
	import { ModeWatcher } from 'mode-watcher';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import type { LayoutProps } from './$types';

	let { children, data }: LayoutProps = $props();
</script>

<Sidebar.Provider>
	<AppSidebar session={data.session} />
	<main class="flex-1">
		<ModeWatcher />

		{@render children?.()}
	</main>
</Sidebar.Provider>
