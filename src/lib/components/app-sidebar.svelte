<script lang="ts">
	import House from '@lucide/svelte/icons/house';
	import Inbox from '@lucide/svelte/icons/inbox';
	import Settings from '@lucide/svelte/icons/settings';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Server from 'lucide-svelte/icons/server';
	import { User } from 'lucide-svelte';
	import { authClient, type Session } from '$lib/auth-client';
	import Button from './ui/button/button.svelte';
	import Separator from './ui/separator/separator.svelte';
	import { redirect } from '@sveltejs/kit';
	import { invalidateAll } from '$app/navigation';

	let { session }: { session: Session | null } = $props();

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
			title: 'Dinos',
			url: '/dinos',
			icon: Inbox
		},
		{
			title: 'Settings',
			url: '/settings',
			icon: Settings
		}
	];
</script>

<Sidebar.Root collapsible="icon">
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>ARK Breeding</Sidebar.GroupLabel>
			{#if session?.user}
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
			{/if}
		</Sidebar.Group>
	</Sidebar.Content>
	<Sidebar.Footer>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<DropdownMenu.Root>
					<DropdownMenu.Trigger>
						{#snippet child({ props })}
							{#if session?.user}
								<Sidebar.MenuButton
									{...props}
									class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
								>
									<User />
									{session.user.name}
								</Sidebar.MenuButton>
							{:else}
								<div class="flex flex-row justify-around">
									<Button variant="link" href="/signin">Sign In</Button>
									<Separator orientation="vertical" />
									<Button variant="link" href="/signup">Sign Up</Button>
								</div>
							{/if}
						{/snippet}
					</DropdownMenu.Trigger>
					<DropdownMenu.Content side="top" class="w-[--bits-dropdown-menu-anchor-width]">
						<!-- <DropdownMenu.Item> -->
						<!-- 	<span>Account</span> -->
						<!-- </DropdownMenu.Item> -->
						<!-- <DropdownMenu.Item> -->
						<!-- 	<span>Billing</span> -->
						<!-- </DropdownMenu.Item> -->
						{#if session?.user}
							<DropdownMenu.Item
								onclick={() => {
									authClient.signOut({
										fetchOptions: {
											onSuccess() {
												invalidateAll();
											}
										}
									});
								}}
							>
								<button>Sign out or not???</button>
							</DropdownMenu.Item>
						{:else}
							<DropdownMenu.Item>Sign In</DropdownMenu.Item>
						{/if}
					</DropdownMenu.Content>
				</DropdownMenu.Root>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Footer>
</Sidebar.Root>
