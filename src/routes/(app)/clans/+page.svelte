<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import * as Dialog from '$lib/components/ui/dialog/index';
	import { Button } from '$lib/components/ui/button';
	import SiteHeader from '$lib/components/site-header.svelte';
	import { buttonVariants } from '$lib/components/ui/button';
	import { BadgeCheckIcon, Plus, PlusIcon, User, X } from '@lucide/svelte';
	import FormNewClan from './form-new-clan.svelte';
	import SectionCards from './section-cards.svelte';
	import { Badge } from '$lib/components/ui/badge';

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
						<Badge
							contenteditable
							variant="destructive"
							class="h-6 [&>svg]:size-4"
							onclick={() => {
								alert('Are you sure you wanna leave the clan? :(');
							}}
						>
							<X />
						</Badge>
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
						Invite new player <Button size="sm" variant="outline"><Plus class="size-4" /></Button>
					</div>
					<div class="text-muted-foreground">Your dino libray is shared with your clan.</div>
					<div class="text-muted-foreground">
						The mutualized library has {500 + Math.floor(Math.random() * 1000)} dinos!
					</div>
				</Card.Footer>
			</Card.Root>
		{/each}
	</div>
</div>
