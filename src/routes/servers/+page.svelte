<script lang="ts">
	import UiLayout from '$lib/components/ui-layout.svelte';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import WorkInProgress from '$lib/components/work-in-progress.svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import { formSchema, type FormSchema } from './schema';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();
	const form = superForm(data.form, {
		validators: zodClient(formSchema)
	});
	const { form: formData, enhance } = form;
</script>

<UiLayout>
	{#snippet header()}
		<Dialog.Root>
			<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>Create server</Dialog.Trigger>
			<Dialog.Content class="sm:max-w-[425px]">
				<Dialog.Header>
					<Dialog.Title>New Server</Dialog.Title>
					<Dialog.Description>
						Enter the information of your Ark server. Click save when you're done.
					</Dialog.Description>
				</Dialog.Header>
				<form method="POST" action="?/NewServer" use:enhance>
					<Form.Field {form} name="name">
						<Form.Control>
							{#snippet children({ props })}
								<Form.Label>Username</Form.Label>
								<Input {...props} bind:value={$formData.name} />
							{/snippet}
						</Form.Control>
						<Form.FieldErrors />
					</Form.Field>
					<Form.Button>Submit</Form.Button>
				</form>
			</Dialog.Content>
		</Dialog.Root>
	{/snippet}

	{#snippet content()}
		<WorkInProgress />
	{/snippet}
</UiLayout>
