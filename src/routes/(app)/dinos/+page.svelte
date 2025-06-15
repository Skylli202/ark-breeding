<script lang="ts">
	import UiLayout from '$lib/components/ui-layout.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { CircleMinus, CirclePlus, Plus } from '@lucide/svelte';
	import { formSchema } from './schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { columns } from './columns';
	import FormControlDinoLevel from './form-control-dino-level.svelte';

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
		<div class="mt-4 mr-4 ml-12">
			<DataTable data={data.dinos} {columns} />
		</div>
	{/snippet}
</UiLayout>
