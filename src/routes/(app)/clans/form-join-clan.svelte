<script lang="ts">
	import * as Form from '$lib/components/ui/form/index';
	import { Input } from '$lib/components/ui/input';
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
</script>

<form method="POST" action="?/NewClan" use:enhance>
	<Form.Field {form} name="code">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Code</Form.Label>
				<Input {...props} bind:value={$formData.code} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="mt-2 w-full">Create</Form.Button>
</form>
