<script lang="ts">
	import SiteHeader from '$lib/components/site-header.svelte';
	import { buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema } from './schema';
	import Plus from '@lucide/svelte/icons/plus';
	import DataTable from '$lib/components/ui/data-table/data-table.svelte';
	import { columns } from './columns';

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
	const { form: formData, enhance } = form;
</script>

<SiteHeader>
	<Dialog.Root bind:open>
		<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
			<Plus class="-mx-1"></Plus>
			Create server
		</Dialog.Trigger>
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
							<Form.Label>Server nickname</Form.Label>
							<Input {...props} bind:value={$formData.name} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Button>Submit</Form.Button>
			</form>
		</Dialog.Content>
	</Dialog.Root>
</SiteHeader>
<div class="flex flex-1 flex-col">
	<div class="@container/main flex flex-1 flex-col gap-2">
		<div class="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
			<div class="flex w-full flex-col items-start space-y-8 px-4 lg:px-6">
				<DataTable data={data.servers} {columns} />
			</div>
		</div>
	</div>
</div>
