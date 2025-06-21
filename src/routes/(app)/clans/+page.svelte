<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import { Button } from '$lib/components/ui/button';
	import SiteHeader from '$lib/components/site-header.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { Plus, PlusIcon, User, X } from '@lucide/svelte';
	import FormNewClan from './form-new-clan.svelte';
	import { Badge } from '$lib/components/ui/badge';
	import FormJoinClan from './form-join-clan.svelte';

	let openNewClanDialog = $state(false);
	let openJoinClanDialog = $state(false);
	let { data } = $props();
	let session = $derived(data.session);
	let clans = $derived(data.clans);
</script>

<SiteHeader>
	<Dialog.Root bind:open={openNewClanDialog}>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
			<PlusIcon />
			<span class="hidden lg:inline">Create clan</span>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>New clan</Dialog.Title>
				<Dialog.Description>
					Create a new clan, give a name and invite your friends! Click save when you're done.
				</Dialog.Description>
			</Dialog.Header>
			<FormNewClan data={{ form: data.formNewClan }} bind:open={openNewClanDialog} />
		</Dialog.Content>
	</Dialog.Root>
	<Dialog.Root bind:open={openJoinClanDialog}>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
			<PlusIcon />
			<span class="hidden lg:inline">Join clan</span>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>Join clan</Dialog.Title>
				<Dialog.Description>
					Paste the code your friends gave you down there! And join their clan to share your dinos
					with them!
				</Dialog.Description>
			</Dialog.Header>
			<FormJoinClan data={{ form: data.formJoinClan }} bind:open={openJoinClanDialog} />
		</Dialog.Content>
	</Dialog.Root>
</SiteHeader>
<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
	<div
		class="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4"
	>
		{#each clans as clan}
			<Card.Root class="@container/card">
				<Card.Header>
					<Card.Description>Clan</Card.Description>
					<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{clan.name}
					</Card.Title>
					<Card.Action class="flex flex-row items-center gap-1.5">
						<Badge variant="outline" class="h-6">
							<User />
							{clan.usersToClans.length}
						</Badge>
						{#if clan.ownerId === session.user.id}
							<form method="post" action="?/DeleteClan">
								<input hidden value={clan.id} name="id" />
								<button type="submit">
									<Badge
										contenteditable
										variant="destructive"
										class="h-6 cursor-pointer [&>svg]:size-4"
									>
										<X />
									</Badge>
								</button>
							</form>
						{/if}
					</Card.Action>
				</Card.Header>
				<Card.Content>
					{#if clan.usersToClans.length > 0}
						<ul>
							{#each clan.usersToClans as usersToClans}
								<li class="text-muted-foreground">
									{usersToClans.user.name} - {usersToClans.user.email}
								</li>
							{/each}
						</ul>
					{/if}
				</Card.Content>
				<Card.Footer class="flex-col items-start gap-1.5 text-sm">
					<div class="line-clamp-1 flex items-center gap-2 font-medium">
						Invite new player <Button
							size="sm"
							variant="outline"
							onclick={() => alert('add a player')}
						>
							<Plus class="size-4" />
						</Button>
					</div>
					<div class="text-muted-foreground">
						Your dino libray is shared with your clan. The mutualized library has {500 +
							Math.floor(Math.random() * 1000)} dinos!
					</div>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
