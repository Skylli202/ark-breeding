<script lang="ts">
	import * as Form from '$lib/components/ui/form/index.js';
	import { authClient } from '$lib/auth-client';
	import SuperDebug from 'sveltekit-superforms';
	import { setError, superForm } from 'sveltekit-superforms';
	import type { PageProps } from './$types';
	import { formSchema } from './schema';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { goto } from '$app/navigation';
	import { GalleryVerticalEndIcon } from '@lucide/svelte';
	import { Input } from '$lib/components/ui/input';

	const session = authClient.useSession();
	let { data }: PageProps = $props();
	const id = $props.id();

	let invalid = $state(false);
	const form = superForm(data.form, {
		SPA: true,
		validators: zodClient(formSchema),
		async onUpdate(event) {
			if (event.form.valid) {
				invalid = false;
				const { error, data } = await authClient.signIn.email({ ...event.form.data });
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

<div class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
	<div class="w-full max-w-sm">
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
						Dont' have an account?
						<a href="/signup" class="underline underline-offset-4">Sign up</a>
					</div>
				</div>

				<div class="mt-4 flex flex-col gap-3">
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
								<Input
									{...props}
									type="password"
									bind:value={$formData.password}
									aria-invalid={invalid}
								/>
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
		</div>
	</div>
</div>

<SuperDebug data={session} />
