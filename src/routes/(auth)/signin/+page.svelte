<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import SuperDebug from 'sveltekit-superforms';
	import LoginForm from '$lib/components/login-form.svelte';
	const session = authClient.useSession();
</script>

<div class="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
	<div class="w-full max-w-sm">
		<LoginForm />
	</div>
</div>
<!-- <form onsubmit={signIn}> -->
<!-- 	<input name="email" type="email" bind:value={email} /> -->
<!-- 	<input name="password" type="password" bind:value={password} /> -->
<!-- 	<button type="submit">Log in</button> -->
<!-- </form> -->

<SuperDebug data={session} />
