<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import GalleryVerticalEndIcon from '@lucide/svelte/icons/gallery-vertical-end';
	import type { HTMLAttributes } from 'svelte/elements';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { cn, type WithElementRef } from '$lib/utils.js';
	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
	const id = $props.id();

	let email = $state('test@example.com');
	let password = $state('qwerqwerqwer');
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

<div class={cn('flex flex-col gap-6', className)} bind:this={ref} {...restProps}>
	<form onsubmit={signIn}>
		<!-- <div class="flex flex-col gap-6"> -->
		<div class="flex flex-col items-center gap-2">
			<a href="##" class="flex flex-col items-center gap-2 font-medium">
				<div class="flex size-8 items-center justify-center rounded-md">
					<GalleryVerticalEndIcon class="size-6" />
				</div>
				<span class="sr-only">ARK: Breeding</span>
			</a>
			<h1 class="text-xl font-bold">Welcome to ARK Breeding</h1>
			<div class="text-center text-sm">
				Don't have an account?
				<a href="/signup" class="underline underline-offset-4">Sign up</a>
			</div>
		</div>
		<div class="flex flex-col gap-6">
			<div class="grid gap-3">
				<Label for="email-{id}">Email</Label>
				<Input
					aria-invalid
					id="email-{id}"
					name="email"
					type="email"
					placeholder="m@example.com"
					required
					class={invalid ? 'border-red-400' : ''}
					bind:value={email}
				/>
			</div>
			<div class="grid gap-3">
				<Label for="password-{id}">Password</Label>
				<Input
					id="password-{id}"
					name="password"
					type="password"
					required
					bind:value={password}
					class={invalid ? 'border-red-400' : ''}
				/>
			</div>
			<Button type="submit" class="w-full">Login</Button>
			{#if invalid}
				<p class="text-center text-sm text-red-400">{message}</p>
			{/if}
		</div>
		<!-- </div> -->
	</form>
	<div
		class="*:[a]:hover:text-primary text-muted-foreground text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4"
	>
		By clicking continue, you agree to our <a href="##" class="hover:underline">Terms of Service</a>
		and <a href="##" class="hover:underline">Privacy Policy</a>.
	</div>
</div>
