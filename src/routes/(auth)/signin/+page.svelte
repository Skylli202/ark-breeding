<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import SuperDebug from 'sveltekit-superforms';
	import LoginForm from '$lib/components/login-form.svelte';
	const session = authClient.useSession();
</script>

<div class="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
	<div class="w-full max-w-sm">
		<LoginForm />
	</div>
</div>

<SuperDebug data={session} />
