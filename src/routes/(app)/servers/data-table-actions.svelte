<script lang="ts">
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Trash2 } from '@lucide/svelte';

	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { type SelectServer } from '$lib/server/schema';
	import { enhance } from '$app/forms';
	import { invalidate } from '$app/navigation';

	let { id }: { id: SelectServer['id'] } = $props();
	let open = $state(false);
</script>

<div class="text-right">
	<DropdownMenu.Root>
		<DropdownMenu.Trigger>
			{#snippet child({ props })}
				<Button {...props} variant="ghost" size="icon" class="relative size-8 p-0">
					<span class="sr-only">Open menu</span>
					<EllipsisIcon />
				</Button>
			{/snippet}
		</DropdownMenu.Trigger>
		<DropdownMenu.Content>
			<DropdownMenu.Group>
				<DropdownMenu.Label>Actions</DropdownMenu.Label>
				<DropdownMenu.Item
					onclick={() => {
						open = true;
					}}
				>
					Edit server settings
				</DropdownMenu.Item>
			</DropdownMenu.Group>
			<DropdownMenu.Separator />
			<DropdownMenu.Item variant="destructive">
				<form
					method="POST"
					action="/servers/{id}?/delete"
					use:enhance={() => {
						return ({ result, update }) => {
							if (result.type === 'success') {
								update();
							}
						};
					}}
				>
					<button type="submit" class="flex flex-row items-center gap-2">
						<Trash2 />
						Delete
					</button>
				</form>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>

	<Sheet.Root bind:open>
		<Sheet.Content side="right">
			<!-- <form method="POST" action="?/UpdateServerSettings"> -->
			<Sheet.Header>
				<Sheet.Title>Edit server setting</Sheet.Title>
				<Sheet.Description>
					Make changes to your server setting. Click save when you're done.
				</Sheet.Description>
			</Sheet.Header>
			<div class="grid flex-1 auto-rows-min gap-6 px-4">
				<div class="grid gap-3">
					<Label for="name" class="text-right">Health ratio</Label>
					<Input id="health" value="" />
				</div>
				<div class="grid gap-3">
					<Label for="name" class="text-right">Stamina ratio</Label>
					<Input id="stamina" value="" />
				</div>
				<div class="grid gap-3">
					<Label for="name" class="text-right">Oxygen ratio</Label>
					<Input id="oxygen" value="" />
				</div>
				<div class="grid gap-3">
					<Label for="name" class="text-right">Food ratio</Label>
					<Input id="food" value="" />
				</div>
				<div class="grid gap-3">
					<Label for="name" class="text-right">Weight ratio</Label>
					<Input id="weight" value="" />
				</div>
				<div class="grid gap-3">
					<Label for="name" class="text-right">Damage ratio</Label>
					<Input id="damage" value="" />
				</div>
			</div>
			<Sheet.Footer>
				<Sheet.Close class={buttonVariants({ variant: 'outline' })}>Save changes</Sheet.Close>
			</Sheet.Footer>
			<!-- </form> -->
		</Sheet.Content>
	</Sheet.Root>
</div>
