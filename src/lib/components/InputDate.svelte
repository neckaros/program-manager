<script lang="ts">
	import MdSearch from 'svelte-icons/md/MdSearch.svelte';
	import MdCancel from 'svelte-icons/md/MdCancel.svelte';
	import { createEventDispatcher } from 'svelte';
	export let value: Date = undefined;
	export let inputField: HTMLInputElement | undefined = undefined;
	export let placeholder: string = 'Search';

	const dispatch = createEventDispatcher();

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === 'Enter') {
			if (e.ctrlKey) dispatch('confirm', value);
			else dispatch('enter', value);
		} else if (e.key === 'Escape') {
			dispatch('escape', e);
		}else if (e.key === 'ArrowDown') {
			dispatch('down', e);
		} else if (e.key === 'ArrowUp') {
			dispatch('up', e);
		} else if (e.key === 'Backspace') {
			dispatch('remove');
		}
	};
	const clickAction = () => {
		dispatch('clickaction', value);
	}
	const updateDate = (e) => {
		value = e.target.valueAsDate;
	}
</script>
<slot name="label"/>
<div class="relative flex w-full flex-wrap items-stretch my-3 px-2 {$$props.class ?? ''}">
	{#if $$slots.icon} <span
		class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
	>
		<slot name="icon" />
	</span>{/if}
	<input
		on:keydown={onKeyDown}
		bind:this={inputField}
		value={value ? value.toISOString().split('T')[0] : undefined}
		on:change={updateDate}
		type="date"
		{placeholder}
		class={`py-3 placeholder-blueGray-300 text-blueGray-600 relative  bg-white dark:bg-gray-700 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full ${$$slots.action ? 'pr-10' : 'pr-2'} ${$$slots.icon ? 'pl-10' : 'pl-2'}`}
	/>
	{#if $$slots.action}<span
		class="cursor-pointer z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute right-5 bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
		on:click={clickAction}
	>
		<div><slot name="action" /></div>
	</span>{/if}
</div>
