<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	let { children } = $props();
</script>

<div>
	<ModeWatcher />
	{@render children()}
</div>
