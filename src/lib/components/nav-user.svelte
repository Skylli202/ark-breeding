<script lang="ts">
	import DotsVerticalIcon from '@tabler/icons-svelte/icons/dots-vertical';
	import LogoutIcon from '@tabler/icons-svelte/icons/logout';
	import UserCircleIcon from '@tabler/icons-svelte/icons/user-circle';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { Session } from '$lib/auth-client';
	import { authClient } from '$lib/auth-client';
	import { invalidateAll } from '$app/navigation';

	let { session }: { session: Session } = $props();

	const sidebar = Sidebar.useSidebar();
	let avatarFallback = $derived.by(() => {
		return session.user.name.substring(0, 1).toUpperCase();
	});
</script>

<Sidebar.Menu>
	<Sidebar.MenuItem>
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				{#snippet child({ props })}
					<Sidebar.MenuButton
						{...props}
						size="lg"
						class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
					>
						<Avatar.Root class="size-8 rounded-lg grayscale">
							<!-- TODO: Use a real avatar if I support this one day -->
							<!-- <Avatar.Image src={user.avatar} alt={user.name} /> -->
							<Avatar.Fallback class="rounded-lg">
								{avatarFallback}
							</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{session.user.name}</span>
							<span class="text-muted-foreground truncate text-xs">
								{session.user.email}
							</span>
						</div>
						<DotsVerticalIcon class="ml-auto size-4" />
					</Sidebar.MenuButton>
				{/snippet}
			</DropdownMenu.Trigger>
			<DropdownMenu.Content
				class="w-(--bits-dropdown-menu-anchor-width) min-w-56 rounded-lg"
				side={sidebar.isMobile ? 'bottom' : 'right'}
				align="end"
				sideOffset={4}
			>
				<DropdownMenu.Label class="p-0 font-normal">
					<div class="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
						<Avatar.Root class="size-8 rounded-lg">
							<!-- TODO: Use a real avatar if I support this one day -->
							<!-- <Avatar.Image src={session.user.avatar} alt={session.user.name} /> -->
							<Avatar.Fallback class="rounded-lg">
								{avatarFallback}
							</Avatar.Fallback>
						</Avatar.Root>
						<div class="grid flex-1 text-left text-sm leading-tight">
							<span class="truncate font-medium">{session.user.name}</span>
							<span class="text-muted-foreground truncate text-xs">
								{session.user.email}
							</span>
						</div>
					</div>
				</DropdownMenu.Label>
				<DropdownMenu.Separator />
				<DropdownMenu.Group>
					<!-- TODO: Implement the account page -->
					<DropdownMenu.Item>
						<UserCircleIcon />
						Account
					</DropdownMenu.Item>
				</DropdownMenu.Group>
				<DropdownMenu.Separator />
				<DropdownMenu.Item
					onclick={async () => {
						await authClient.signOut();
						invalidateAll();
					}}
				>
					<LogoutIcon />
					Log out
				</DropdownMenu.Item>
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</Sidebar.MenuItem>
</Sidebar.Menu>
