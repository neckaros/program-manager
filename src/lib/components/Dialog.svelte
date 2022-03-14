<script lang="ts">
	import Portal from 'svelte-portal/src/Portal.svelte';
import { fade } from 'svelte/transition';
	export let noBackbroung: boolean = false;
	export let top: boolean = false;
</script>

<Portal target="body">
	<div
		class={`fixed top-0 left-0 w-full h-full overflow-hidden p-0-safe ${
			noBackbroung ? '' : 'bg-black/90 backdrop-filter backdrop-blur'
		} z-50  flex flex-col items-center ${top ? 'justify-start' : 'justify-center'} ${$$props.class ? $$props.class : ''}`}
		on:click
		out:fade={{duration: 200}}
		in:fade={{duration: 200}}
	>
		<slot/>
	</div>
</Portal>
