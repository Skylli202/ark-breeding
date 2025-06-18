<script lang="ts">
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { ChevronRightIcon, PlusIcon } from '@lucide/svelte';
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { columns } from './columns';
	import type { SelectSpecies } from '$lib/server/schema';
	import SiteHeader from '$lib/components/site-header.svelte';
	import FormNewDino from './form-new-dino.svelte';

	let open = $state(false);
	let { data } = $props();

	const species = $derived(data.species);
	const dinoMap = $derived.by(() => {
		const map = new Map<(typeof data.dinos)[0]['entityId'], typeof data.dinos>();
		for (const dino of data.dinos) {
			let tmp = map.get(dino.entityId);
			if (tmp) {
				tmp.push(dino);
			} else {
				map.set(dino.entityId, [dino]);
			}
		}
		return map;
	});

	async function getSpecies(entityId: string): Promise<SelectSpecies> {
		let r = await fetch(`/api/species/${entityId}`, { method: 'GET' });
		if (r.ok) {
			return r.json();
		}
		throw new Error(`Unable to retrieve species information for entity ID "${entityId}".`);
	}
</script>

<SiteHeader>
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
			<PlusIcon />
			<span class="hidden lg:inline">Add Dino</span>
		</Dialog.Trigger>
		<Dialog.Content class="sm:max-w-[425px]">
			<Dialog.Header>
				<Dialog.Title>New dino</Dialog.Title>
				<Dialog.Description>
					Enter the stats levels of your tame, as they appear in the egg incubator. Optionnally, you
					can give your tame a name. Click save when you're done.
				</Dialog.Description>
			</Dialog.Header>
			<FormNewDino {data} {species} {open} />
		</Dialog.Content>
	</Dialog.Root>
</SiteHeader>
<div class="flex flex-1 flex-col">
	<div class="@container/main flex flex-1 flex-col gap-2">
		<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<div class="flex w-full flex-col items-start space-y-8 px-4 lg:px-6">
				<!-- <div class="mt-4 mr-4 ml-12 space-y-4"> -->
				{#each dinoMap as [entityId, dinos]}
					{#await getSpecies(entityId) then species}
						<Collapsible.Root class="group/collapsible w-full" open={true}>
							<Collapsible.Trigger>
								<div class="flex flex-row items-center">
									<h2
										class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
									>
										{species.commonName}
									</h2>
									<ChevronRightIcon
										class="mt-1 ml-auto size-10 transition-transform group-data-[state=open]/collapsible:rotate-90"
									/>
								</div>
							</Collapsible.Trigger>
							<Collapsible.Content class="mt-2">
								<DataTable data={dinos} {columns} />
							</Collapsible.Content>
						</Collapsible.Root>
					{/await}
				{/each}
			</div>
		</div>
	</div>
</div>
