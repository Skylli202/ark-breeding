<script lang="ts">
	import SuperDebug from 'sveltekit-superforms';
	import type { PageProps } from './$types';
	import SignupForm from './signup-form.svelte';

	let { data }: PageProps = $props();
</script>

<SignupForm {data} />

<SuperDebug {data} />
