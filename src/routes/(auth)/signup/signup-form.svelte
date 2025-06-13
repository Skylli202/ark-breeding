<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { GalleryVerticalEndIcon } from '@lucide/svelte';
	import { type Infer, setError, superForm, type SuperValidated } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { formSchema, type FormSchema } from './schema';
	import { goto } from '$app/navigation';
	import { authClient } from '$lib/auth-client';

	let { data }: { data: { form: SuperValidated<Infer<FormSchema>> } } = $props();

	let invalid = $state(false);
	const form = superForm(data.form, {
		SPA: true,
		validators: zodClient(formSchema),
		async onUpdate(event) {
			if (event.form.valid) {
				invalid = false;
				const { error, data } = await authClient.signUp.email({ ...event.form.data });
				if (error) {
					if (error.message) {
						setError(event.form, error.message);
					} else {
						setError(event.form, 'An unknown error occurred during sign up.');
					}
					invalid = true;
				} else {
					console.log(`Successfully signup user ${data.user.name} (${data.user.email})`);
					await goto('/');
				}
			} else {
				invalid = true;
			}
		}
	});

	let formData = $derived(form.form);
	let errors = $derived(form.errors);
	// let message = $derived(form.message);
	let submitting = $derived(form.submitting);
	let enhance = $derived(form.enhance);
</script>

<div class="flex flex-col gap-6">
	<form method="POST" use:enhance>
		<div class="flex flex-col items-center gap-2">
			<a href="##" class="flex flex-col items-center gap-2 font-medium">
				<div class="flex size-8 items-center justify-center rounded-md">
					<GalleryVerticalEndIcon class="size-6" />
				</div>
				<span class="sr-only">ARK: Breeding</span>
			</a>
			<h1 class="text-xl font-bold">Welcome to ARK Breeding</h1>
			<div class="text-center text-sm">
				Already have an account?
				<a href="/signin" class="underline underline-offset-4">Sign in</a>
			</div>
		</div>

		<div class="mt-4 flex flex-col gap-3">
			<Form.Field {form} name="name">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Username</Form.Label>
						<Input {...props} bind:value={$formData.name} aria-invalid={invalid} />
					{/snippet}
				</Form.Control>
				<Form.Description>This is your public display name.</Form.Description>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input {...props} bind:value={$formData.email} aria-invalid={invalid} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Input {...props} bind:value={$formData.password} aria-invalid={invalid} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			{#if $errors._errors}
				<div class="">
					{#each $errors._errors as error}
						<p class="text-destructive text-center text-sm">{error}</p>
					{/each}
				</div>
			{/if}

			<Form.Button class="w-full cursor-pointer" disabled={$submitting}>
				{$submitting ? 'Submitting...' : 'Submit'}
			</Form.Button>
		</div>
	</form>
	<div
		class="*:[a]:hover:text-primary text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"
	>
		By clicking continue, you agree to our <a href="##" class="">Terms of Service</a>
		and <a href="##" class="">Privacy Policy</a>.
	</div>
</div>
