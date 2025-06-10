<script lang="ts">
	import { authClient } from '$lib/auth-client';
	import SuperDebug from 'sveltekit-superforms';
	const session = authClient.useSession();

	let email = $state('test@example.com');
	let name = $state('skylli');
	let password = $state('qwerqwerqwer');

	async function signUp(event: SubmitEvent) {
		event.preventDefault();
		console.log(`Signing up this lads: ${name} with ${email} and password: ${password}`);
		const f = await authClient.signUp.email(
			{ email, name, password },
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

<!-- <form method="post" action="?/SignUp"> -->
<form onsubmit={signUp}>
	<input name="email" type="email" bind:value={email} />
	<input name="password" type="password" bind:value={password} />
	<input name="name" type="text" bind:value={name} />
	<button type="submit">Log in</button>
</form>

<SuperDebug data={session} />
