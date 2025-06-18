<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { CircleMinus, CirclePlus } from '@lucide/svelte';

	let { label = '', value = $bindable() }: { label: string; value: number } = $props();
</script>

<Form.Control>
	{#snippet children({ props })}
		<Form.Label>{label}</Form.Label>
		<div class="relative w-full max-w-sm">
			<div class="absolute inset-y-0 right-0 flex items-center pr-1">
				<Button
					tabindex={-1}
					variant="ghost"
					size="icon"
					class="size-6 cursor-pointer"
					onclick={() => {
						if (typeof value == 'string') {
							value = parseInt(value, 10);
						}
						value++;
					}}
				>
					<CirclePlus class="size-5" />
				</Button>
				<Button
					tabindex={-1}
					variant="ghost"
					size="icon"
					class="size-6 cursor-pointer"
					onclick={() => {
						if (typeof value == 'string') {
							value = parseInt(value, 10);
						}
						value--;
					}}
				>
					<CircleMinus class="size-5" />
				</Button>
			</div>
			<Input {...props} bind:value />
		</div>
	{/snippet}
</Form.Control>
