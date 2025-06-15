<script lang="ts">
	import UiLayout from '$lib/components/ui-layout.svelte';
	import { Input } from '$lib/components/ui/input/index.js';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { CircleMinus, CirclePlus, Plus } from '@lucide/svelte';
	import { formSchema } from './schema';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';

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

					<div class="grid grid-cols-2 gap-2">
						<Form.Field {form} name="healthLevels">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Health levels</Form.Label>
									<div class="flex flex-row items-center gap-2">
										<Input {...props} bind:value={$formData.healthLevels} />
										<CirclePlus
											class="h-10 w-10"
											onclick={() => {
												$formData.healthLevels++;
											}}
										></CirclePlus>
										<CircleMinus
											class="h-10 w-10"
											onclick={() => {
												$formData.healthLevels--;
											}}
										></CircleMinus>
									</div>
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="staminaLevels">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Stamina levels</Form.Label>
									<Input {...props} bind:value={$formData.staminaLevels} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="weightLevels">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Weight levels</Form.Label>
									<Input {...props} bind:value={$formData.weightLevels} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="damageLevels">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Damage level</Form.Label>
									<Input {...props} bind:value={$formData.damageLevels} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="oxygenLevels">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Oxygen levels</Form.Label>
									<Input {...props} bind:value={$formData.oxygenLevels} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>

						<Form.Field {form} name="foodLevels">
							<Form.Control>
								{#snippet children({ props })}
									<Form.Label>Food level</Form.Label>
									<Input {...props} bind:value={$formData.foodLevels} />
								{/snippet}
							</Form.Control>
							<Form.FieldErrors />
						</Form.Field>
					</div>

					<Form.Button>Submit</Form.Button>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	{/snippet}

	{#snippet content()}
		<div class="">wip</div>
	{/snippet}
</UiLayout>
