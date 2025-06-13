<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';
	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();

	let email = $state('');
	let password = $state('');
	let invalid = $state(false);
	let message = $state('');

	async function signIn(event: SubmitEvent) {
		event.preventDefault();
		// console.log(`Signing up this lads: ${name} with ${email} and password: ${password}`);
		const f = await authClient.signIn.email(
			{ email, password, callbackURL: '/' },
			{
				onRequest(_context) {
					invalid = false;
					// console.log('onRequest', context);
				},
				onResponse(_context) {
					// console.log('onResponse', context);
				},
				onSuccess(_context) {
					// console.log('onSuccess', context);
				},
				onError(context) {
					console.error('onError', context);
					invalid = true;
					message = context.error.message;
				}
			}
		);
		console.log(f);
	}
</script>
