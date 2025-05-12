<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/app-sidebar.svelte';
	import { onMount } from 'svelte';
	import { invalidate } from '$app/navigation';

	let { children, data } = $props();
	let { supabase, session } = data;

	onMount(() => {
		const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
			if (newSession?.expires_at !== session?.expires_at) {
				invalidate('supabase:auth');
			}
		});
		return () => data.subscription.unsubscribe();
	});
</script>

<Sidebar.Provider>
	<AppSidebar {supabase} />
	<main class="flex-1">
		<ModeWatcher />

		{@render children?.()}
	</main>
</Sidebar.Provider>
