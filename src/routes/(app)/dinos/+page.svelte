<script lang="ts">
	import UiLayout from '$lib/components/ui-layout.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Collapsible from '$lib/components/ui/collapsible/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { ChevronRightIcon, Plus } from '@lucide/svelte';
	import { formSchema } from './schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { columns } from './columns';
	import FormControlDinoLevel from './form-control-dino-level.svelte';
	import type { SelectSpecies } from '$lib/server/schema';

	let open = $state(false);
	let { data } = $props();
	const form = superForm(data.form, {
		validators: zodClient(formSchema),
		// Close the dialog on successful creation!
		onUpdated(event) {
			if (!event.form.valid) {
				return;
			}
			open = false;
		}
	});
	const species = $derived(data.species);
	const formData = $derived(form.form);
	const enhance = $derived(form.enhance);

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

<UiLayout>
	{#snippet header()}
		<Dialog.Root bind:open>
			<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
				<Plus class="-mx-1"></Plus>
				Add dino
			</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px]">
				<Dialog.Header>
					<Dialog.Title>New dino</Dialog.Title>
					<Dialog.Description>
						Enter the stats levels of your tame, as they appear in the egg incubator. Optionnally,
						you can give your tame a name. Click save when you're done.
					</Dialog.Description>
				</Dialog.Header>
				<form method="POST" action="?/NewDino" use:enhance>
					<Form.Field {form} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Tame nickname</Form.Label>
								<Input {...props} bind:value={$formData.name} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<Form.Field {form} name="entityId" class="w-full">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Species</Form.Label>
								<Select.Root type="single" bind:value={$formData.entityId} name={props.name}>
									<Select.Trigger {...props} class="w-full">
										{$formData.entityId
											? species.find((s) => s.entityId === $formData.entityId)?.commonName
											: 'Select the specie of your dino!'}
									</Select.Trigger>
									<Select.Content>
										{#each species as specie}
											<!-- HACK: commonName can be null because the column ain't NOT NULL but I do not think that's a real thing -->
											<Select.Item value={specie.entityId} label={specie.commonName ?? ''} />
										{/each}
									</Select.Content>
								</Select.Root>
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>

					<div class="grid grid-cols-2 gap-2">
						<Form.Field {form} name="healthLevels">
							<FormControlDinoLevel label="Health levels" bind:value={$formData.healthLevels} />
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="staminaLevels">
							<FormControlDinoLevel label="Stamina levels" bind:value={$formData.staminaLevels} />
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="weightLevels">
							<FormControlDinoLevel label="Weight levels" bind:value={$formData.weightLevels} />
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="damageLevels">
							<FormControlDinoLevel label="Damage levels" bind:value={$formData.damageLevels} />
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="oxygenLevels">
							<FormControlDinoLevel label="Oxygen levels" bind:value={$formData.oxygenLevels} />
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="foodLevels">
							<FormControlDinoLevel label="Food levels" bind:value={$formData.foodLevels} />
							<Form.FieldErrors />
						</Form.Field>
					</div>

					<Form.Button class="mt-2 w-full">Submit</Form.Button>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	{/snippet}

	{#snippet content()}
		<div class="mt-4 mr-4 ml-12 space-y-4">
			{#each dinoMap as [entityId, dinos]}
				{#await getSpecies(entityId) then species}
					<Collapsible.Root class="group/collapsible">
						<Collapsible.Trigger>
							<div class="flex flex-row items-center gap-2">
								<h2
									class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
								>
									{species.commonName}
								</h2>
								<ChevronRightIcon
									class="mt-1 ml-auto size-12 transition-transform group-data-[state=open]/collapsible:rotate-90"
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
	{/snippet}
</UiLayout>
