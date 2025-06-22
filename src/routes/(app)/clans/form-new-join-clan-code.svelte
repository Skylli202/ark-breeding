<script lang="ts">
	import * as InputOTP from '$lib/components/ui/input-otp/index';
	import * as Form from '$lib/components/ui/form/index';
	import { Input } from '$lib/components/ui/input';
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { formGenJoinClanCodeSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Clipboard } from '@lucide/svelte';

	interface Props {
		clanId: string;
		data: { form: SuperValidated<Infer<typeof formGenJoinClanCodeSchema>> };
		open?: boolean;
	}

	let { clanId, data, open = $bindable() }: Props = $props();

	const form = superForm(data.form, {
		resetForm: false, // I do not want to reset the form o/w the generated code will never be displayed!
		validators: zodClient(formGenJoinClanCodeSchema),
		onUpdated(event) {
			if (!event.form.valid) {
				return;
			}
		}
	});

	const formData = $derived(form.form);
	$formData.clanId = clanId;
	const enhance = $derived(form.enhance);
</script>

<form method="POST" action="?/GenJoinClanCode" use:enhance>
	<Form.Field {form} name="clanId" hidden>
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Code</Form.Label>
				<Input {...props} bind:value={$formData.clanId} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	{#if $formData.code}
		<Form.Field {form} name="code">
			<Form.Control>
				<Form.Label>Code</Form.Label>
				<div class="flex flex-row items-center justify-stretch gap-2">
					<InputOTP.Root maxlength={6} bind:value={$formData.code} disabled class="w-full">
						{#snippet children({ cells })}
							<InputOTP.Group>
								{#each cells.slice(0, 6) as cell (cell)}
									<InputOTP.Slot {cell} />
								{/each}
							</InputOTP.Group>
						{/snippet}
					</InputOTP.Root>
					<Button
						class=""
						onclick={() => {
							const { code } = $formData;
							if (code) {
								navigator.clipboard.writeText(code);
							}
						}}
					>
						<Clipboard />
						Copy
					</Button>
				</div>
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
	{/if}
	{#if !$formData.code}
		<Form.Button class="mt-2 w-full">Generate</Form.Button>
	{/if}
</form>
