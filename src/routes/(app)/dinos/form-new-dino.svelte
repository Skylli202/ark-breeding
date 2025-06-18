<script lang="ts">
	import * as Command from '$lib/components/ui/command/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Popover from '$lib/components/ui/popover/index.js';
	import { CheckIcon, ChevronsUpDownIcon } from '@lucide/svelte';
	import FormControlDinoLevel from './form-control-dino-level.svelte';

	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import type { SelectSpecies } from '$lib/server/schema';
	import { cn } from '$lib/utils';
	import { buttonVariants } from '$lib/components/ui/button';
	import { useId } from 'bits-ui';
	import { formSchema } from './schema';
	import { tick } from 'svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

	interface Props {
		data: { form: SuperValidated<Infer<typeof formSchema>> };
		species: SelectSpecies[];
		open: boolean;
	}

	let { data, species, open = $bindable() }: Props = $props();

	const triggerId = useId();

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

	const formData = $derived(form.form);
	const enhance = $derived(form.enhance);

	let comboboxOpen = $state(false);
	function closeAndFocusTrigger(triggerId: string) {
		comboboxOpen = false;
		tick().then(() => {
			document.getElementById(triggerId)?.focus();
		});
	}
</script>

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
		<Popover.Root bind:open={comboboxOpen}>
			<Form.Control id={triggerId}>
				{#snippet children({ props })}
					<Form.Label>Species</Form.Label>
					<Popover.Trigger
						class={cn(
							buttonVariants({ variant: 'outline' }),
							'w-full justify-between',
							!$formData.entityId && 'text-muted-foreground'
						)}
						role="combobox"
						{...props}
					>
						{species.find((f) => f.entityId === $formData.entityId)?.commonName ??
							'Select language'}
						<ChevronsUpDownIcon class="opacity-50" />
					</Popover.Trigger>
					<input hidden value={$formData.entityId} name={props.name} />
				{/snippet}
			</Form.Control>
			<Popover.Content class="min-w-full p-0">
				<Command.Root class="">
					<Command.Input autofocus placeholder="Search language..." class="h-9" />
					<Command.Empty class="">No language found.</Command.Empty>
					<Command.Group value="species">
						{#each species as { entityId, commonName } (entityId)}
							<Command.Item
								value={entityId}
								onSelect={() => {
									$formData.entityId = entityId;
									closeAndFocusTrigger(triggerId);
								}}
							>
								{commonName}
								<CheckIcon
									class={cn('ml-auto', entityId !== $formData.entityId && 'text-transparent')}
								/>
							</Command.Item>
						{/each}
					</Command.Group>
				</Command.Root>
			</Popover.Content>
		</Popover.Root>
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
