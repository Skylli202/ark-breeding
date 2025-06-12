<script>
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle
	} from '$lib/components/ui/card';
	import { Info } from '@lucide/svelte';
</script>

<div class="flex min-h-full min-w-screen items-center justify-center">
	<Card class="w-[350px] text-center">
		<CardHeader>
			<CardTitle class="flex items-center justify-center space-x-2">
				<Info class="h-6 w-6 text-blue-500" />
				<span>Work in Progress</span>
			</CardTitle>
			<CardDescription>
				This page is currently under development. Please check back later.
			</CardDescription>
		</CardHeader>
		<CardContent>
			<p>We're busy building awesome things here!</p>
		</CardContent>
	</Card>
</div>
