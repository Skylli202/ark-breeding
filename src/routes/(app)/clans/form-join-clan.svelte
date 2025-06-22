<script lang="ts">
	import * as InputOTP from '$lib/components/ui/input-otp/index';
	import * as Form from '$lib/components/ui/form/index';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { formJoinClanSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';

	interface Props {
		data: { form: SuperValidated<Infer<typeof formJoinClanSchema>> };
		open: boolean;
	}

	let { data, open = $bindable() }: Props = $props();

	const form = superForm(data.form, {
		validators: zodClient(formJoinClanSchema),
		onUpdated(event) {
			if (!event.form.valid) {
				return;
			}
			open = false;
		}
	});

	const formData = $derived(form.form);
	const enhance = $derived(form.enhance);
	const allErrors = $derived(form.allErrors);
</script>

<form method="POST" action="?/JoinClan" use:enhance>
	<Form.Field {form} name="code">
		<Form.Control>
			{#snippet children({ props })}
				<InputOTP.Root maxlength={6} {...props} bind:value={$formData.code} class="w-full">
					{#snippet children({ cells })}
						<InputOTP.Group>
							{#each cells.slice(0, 6) as cell (cell)}
								<InputOTP.Slot {cell} />
							{/each}
						</InputOTP.Group>
					{/snippet}
				</InputOTP.Root>
			{/snippet}
		</Form.Control>
		<Form.Description>
			Enter the join code shared by your friends! And join their clan!
		</Form.Description>
		<Form.FieldErrors />
	</Form.Field>

	{#if $allErrors.length}
		<ul>
			{#each $allErrors as error}
				<li>
					<b>{error.path}:</b>
					{error.messages.join('. ')}
				</li>
			{/each}
		</ul>
	{/if}
	<Form.Button class="mt-2 w-full">Join</Form.Button>
</form>
