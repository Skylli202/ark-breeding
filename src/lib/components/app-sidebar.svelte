<script lang="ts">
	import House from '@lucide/svelte/icons/house';
	import Inbox from '@lucide/svelte/icons/inbox';
	import Settings from '@lucide/svelte/icons/settings';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import ChevronUp from '@lucide/svelte/icons/chevron-up';
	import Server from 'lucide-svelte/icons/server';
	import { User } from 'lucide-svelte';
	import { getContext } from 'svelte';
	import type { SupabaseClient, User as SupabaseUser } from '@supabase/supabase-js';

	// Menu items.
	const items = [
		{
			title: 'Home',
			url: '/',
			icon: House
		},
		{
			title: 'Servers',
			url: '/servers',
			icon: Server
		},
		{
			title: 'Libraries',
			url: '/libraries',
			icon: Inbox
		},
		{
			title: 'Settings',
			url: '/settings',
			icon: Settings
		}
	];

	let { supabase }: { supabase: SupabaseClient } = $props();
	const p = supabase.auth.getUser();
	p.then((r) => console.log(r));
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>ARK Breeding</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<Sidebar.Menu>
					{#each items as item (item.title)}
						<Sidebar.MenuItem>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.title}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							<Sidebar.MenuButton
								{...props}
								class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
							>
								<User />
								{#await p}
									LOADING
								{:then r}
									{@const user = r.data.user}
									{@const err = r.error}
									{#if err}
										oops something bad happened ERR
									{:else if user == null}
										oops something bad happened USER NULL
									{:else}
										{user.email}
										<ChevronUp />
									{/if}
								{/await}
							</Sidebar.MenuButton>
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content side="top" class="w-[--bits-dropdown-menu-anchor-width]">
						<!-- <DropdownMenu.Item> -->
						<!-- 	<span>Account</span> -->
						<!-- </DropdownMenu.Item> -->
						<!-- <DropdownMenu.Item> -->
						<!-- 	<span>Billing</span> -->
						<!-- </DropdownMenu.Item> -->
						<DropdownMenu.Item>
							<form action="/auth?/logout" method="POST">
								<button type="submit">Sign out</button>
							</form>
						</DropdownMenu.Item>
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
