<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { SidebarMenuButton } from '$lib/components/ui/sidebar/index.js';
	import type { Icon } from '@tabler/icons-svelte';

	let { items }: { items: { title: string; url: string; icon?: Icon }[] } = $props();
</script>

<Sidebar.Group>
	<Sidebar.GroupContent class="flex flex-col gap-2">
		<Sidebar.Menu>
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton tooltipContent={item.title}>
						{#snippet child({ ...props })}
							<a href={item.url}>
								<SidebarMenuButton {...props}>
									{#if item.icon}
										<item.icon />
									{/if}
									<span>{item.title}</span>
								</SidebarMenuButton>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
