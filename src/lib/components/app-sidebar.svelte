<script lang="ts">
	import BoneIcon from '@tabler/icons-svelte/icons/bone';
	import HelpIcon from '@tabler/icons-svelte/icons/help';
	import InnerShadowTopIcon from '@tabler/icons-svelte/icons/inner-shadow-top';
	import SettingsIcon from '@tabler/icons-svelte/icons/settings';
	import UsersIcon from '@tabler/icons-svelte/icons/users';
	import NavMain from './nav-main.svelte';
	import NavSecondary from './nav-secondary.svelte';
	import NavUser from './nav-user.svelte';
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import type { ComponentProps } from 'svelte';
	import type { Session } from '$lib/auth-client';

	const data = {
		navMain: [
			{
				title: 'Clan',
				url: '#',
				icon: UsersIcon
			},
			{
				title: 'Dinos',
				url: '/dinos',
				icon: BoneIcon
			}
		],
		navSecondary: [
			{
				title: 'Settings',
				url: '#',
				icon: SettingsIcon
			},
			{
				title: 'Get Help',
				url: '#',
				icon: HelpIcon
			}
		]
	};

	let { session, ...restProps }: { session: Session } & ComponentProps<typeof Sidebar.Root> =
		$props();
</script>

<Sidebar.Root collapsible="offcanvas" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton class="data-[slot=sidebar-menu-button]:!p-1.5">
					{#snippet child({ props })}
						<a href="/" {...props}>
							<!-- TODO: Rework the icon to be an ARK icon -->
							<InnerShadowTopIcon class="!size-5" />
							<span class="text-base font-semibold">ARK: Breeding</span>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={data.navMain} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		<NavUser {session} />
	</Sidebar.Footer>
</Sidebar.Root>
