<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import SuperDebug from 'sveltekit-superforms';
	const session = authClient.useSession();

	let email = $state('test@example.com');
	let password = $state('qwerqwerqwer');

	async function signIn(event: SubmitEvent) {
		event.preventDefault();
		console.log(`Signing up this lads: ${name} with ${email} and password: ${password}`);
		const f = await authClient.signIn.email(
			{ email, password },
			{
				onRequest(context) {
					console.log('onRequest', context);
				},
				onResponse(context) {
					console.log('onResponse', context);
				},
				onSuccess(context) {
					console.log('onSuccess', context);
				},
				onError(context) {
					console.error('onError', context);
				}
			}
		);
		console.log(f);
	}
</script>

<form onsubmit={signIn}>
	<input name="email" type="email" bind:value={email} />
	<input name="password" type="password" bind:value={password} />
	<button type="submit">Log in</button>
</form>

<SuperDebug data={session} />
