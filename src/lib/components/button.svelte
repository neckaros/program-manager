<script lang="ts">
	export let disabled: boolean = false;
	export let variant: 'confirm' | 'cancel' | 'normal' = "normal";
</script>

<div class="p-1 {$$props.class ?? ''}">
	<button
		class={`box-border px-4 py-1 shadow w-full uppercase rounded ${
			disabled
				? 'text-black bg-gray-100 cursor-not-allowed'
				: variant === 'confirm'
				? '!bg-green-900 !text-green-200 !dark:bg-green-900 !dark:text-green-200 !hover:bg-green-700 !dark:hover:bg-green-700'
				: variant === 'cancel'
				? '!bg-red-900 !text-red-200 !dark:bg-red-900 !dark:text-red-200 !hover:bg-red-700 !dark:hover:bg-red-700'
				: 'text-black bg-gray-300 dark:text-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-500'
		}`} disabled={disabled ?? false} on:click><slot /></button
	>
</div>
