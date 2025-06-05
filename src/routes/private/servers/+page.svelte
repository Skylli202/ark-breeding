<script lang="ts">
	import { invalidate } from '$app/navigation';
	import type { EventHandler } from 'svelte/elements';
	import type { PageData } from './$types';

	let { data } = $props();
	let { servers, supabase, user } = $derived(data);

	const handleSubmit: EventHandler<SubmitEvent, HTMLFormElement> = async (evt) => {
		evt.preventDefault();
		if (!evt.target) return;

		const form = evt.target as HTMLFormElement;

		const name = (new FormData(form).get('name') ?? '') as string;
		if (!name) return;

		const { error } = await supabase.from('notes').insert({ note: name });
		if (error) console.error(error);

		invalidate('supabase:db:notes');
		form.reset();
	};
</script>

<h1>Private page for user: {user?.email}</h1>
<h2>Notes</h2>
<ul>
	{#each servers as server}
		<li>{server.name}</li>
	{/each}
</ul>
<form onsubmit={handleSubmit}>
	<label>
		Add a note
		<input name="name" type="text" />
	</label>
</form>
