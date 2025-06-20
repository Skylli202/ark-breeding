<script lang="ts">
	import * as Form from '$lib/components/ui/form/index';
	import { Input } from '$lib/components/ui/input';
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { formSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { Button } from '$lib/components/ui/button';

	interface Props {
		data: { form: SuperValidated<Infer<typeof formSchema>> };
		open: boolean;
	}

	let { data, open = $bindable() }: Props = $props();

	const form = superForm(data.form, {
		validators: zodClient(formSchema),
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
	<Form.Field {form} name="name">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Name</Form.Label>
				<Input {...props} bind:value={$formData.name} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>

	<Form.Button class="mt-2 w-full">Create</Form.Button>
</form>
