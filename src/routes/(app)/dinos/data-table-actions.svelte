<script lang="ts">
	import EllipsisIcon from '@lucide/svelte/icons/ellipsis';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Trash2 } from '@lucide/svelte';
	import { enhance } from '$app/forms';

	let { id }: { id: string } = $props();
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
			<DropdownMenu.Item variant="destructive">
				<form
					method="POST"
					action="?/DeleteDino"
					use:enhance={() => {
						return ({ result, update }) => {
							if (result.type === 'success') {
								update();
							}
						};
					}}
				>
        <input hidden value={id} name="id"/>
					<button type="submit" class="flex flex-row items-center gap-2">
						<Trash2 />
						Delete
					</button>
				</form>
			</DropdownMenu.Item>
		</DropdownMenu.Content>
	</DropdownMenu.Root>
</div>
