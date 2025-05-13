<script lang="ts">
	import UiLayout from '$lib/components/ui-layout.svelte';
	import type { PageProps } from './$types';
	import * as Dialog from '$lib/components/ui/dialog';
	import { PlusIcon } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import DataTable from './data-table.svelte';
	import { columns } from './columns';

	let { data }: PageProps = $props();
</script>

<UiLayout>
	{#snippet header()}
		<Dialog.Root>
			<Dialog.Trigger>
				<Button variant="outline" size="icon" class="h-8 w-8">
					<PlusIcon
						class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
					/>
					<span class="sr-only">Toggle theme</span>
				</Button>
			</Dialog.Trigger>
			<Dialog.Content>This is the dialog content. WIP</Dialog.Content>
		</Dialog.Root>
	{/snippet}

	{#snippet content()}
		<DataTable data={data.servers} {columns} />
	{/snippet}
</UiLayout>
