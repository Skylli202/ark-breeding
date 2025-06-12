<script lang="ts">
	import { Separator } from '$lib/components/ui/separator/index';
	import { Button } from '$lib/components/ui/button/index';
	import * as Sidebar from '$lib/components/ui/sidebar/index';
	import { toggleMode } from 'mode-watcher';
	import { Moon, Sun } from 'lucide-svelte';

	interface Props {
		header: import('svelte').Snippet;
		content: import('svelte').Snippet;
	}

	let { header, content }: Props = $props();
</script>

<div class="flex h-full flex-col">
	<header class="sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
		<Sidebar.Trigger class="-ml-1" />
		<Separator orientation="vertical" class="mr-2 h-4" />
		<div class="flex grow items-center justify-between">
			{@render header?.()}
			<!-- <Breadcrumb.Root> -->
			<!-- 	<Breadcrumb.List> -->
			<!-- 		<Breadcrumb.Item class="hidden md:block"> -->
			<!-- 			<Breadcrumb.Link href="#">Building Your Application</Breadcrumb.Link> -->
			<!-- 		</Breadcrumb.Item> -->
			<!-- 		<Breadcrumb.Separator class="hidden md:block" /> -->
			<!-- 		<Breadcrumb.Item> -->
			<!-- 			<Breadcrumb.Page>Data Fetching</Breadcrumb.Page> -->
			<!-- 		</Breadcrumb.Item> -->
			<!-- 	</Breadcrumb.List> -->
			<!-- </Breadcrumb.Root> -->
			<Button onclick={toggleMode} variant="outline" size="icon" class="h-8 w-8">
				<Sun
					class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
				/>
				<Moon
					class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
				/>
				<span class="sr-only">Toggle theme</span>
			</Button>
		</div>
	</header>

	<div class="h-full">
		{@render content?.()}
	</div>
</div>
