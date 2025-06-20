<script>
	import * as Dialog from '$lib/components/ui/dialog/index';
	import SiteHeader from '$lib/components/site-header.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { PlusIcon } from '@lucide/svelte';
	import FormNewClan from './form-new-clan.svelte';

	let open = $state(false);
	let { data } = $props();
	let clans = $derived(data.clans);
</script>

<SiteHeader>
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
			<PlusIcon />
			<span class="hidden lg:inline">Add clan</span>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>New clan</Dialog.Title>
				<Dialog.Description>
					Create a new clan, give a name and invite your friends! Click save when you're done.
				</Dialog.Description>
			</Dialog.Header>
			<FormNewClan {data} bind:open />
		</Dialog.Content>
	</Dialog.Root>
</SiteHeader>

<ul>
	{#each clans as clan}
		<li>
			Clan: {clan.name}
			{#if clan.usersToClans.length > 0}
				<ul>
					{#each clan.usersToClans as usersToClans}
						<li>{usersToClans.user.name} - {usersToClans.user.email}</li>
					{/each}
				</ul>
			{/if}
		</li>
	{/each}
</ul>
