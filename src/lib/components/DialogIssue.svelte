<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import MdClear from 'svelte-icons/md/MdClear.svelte';
	import Dialog from './Dialog.svelte';
	import Button from './Button.svelte';
	import DialogBox from './DialogBox.svelte';
	import { writable } from 'svelte/store';
	import Input from './Input.svelte';
	import type { Issue } from '@prisma/client';
	import InputDate from './InputDate.svelte';
	export let issue: Partial<Issue>;
	let editIssue = { ...issue };
	const dispatch = createEventDispatcher();

	const close = async () => {
		dispatch('close');
	};
	const save = async () => {
		if (editIssue.title && editIssue.title !== '') dispatch('save', editIssue);
		else alert('At least a title is necessary');
	};
	const remove = async () => {
		if (confirm('Are you sure you want to delete this issue and all associated tasks and alerts?'))
			dispatch('remove', editIssue.id);
	};
	console.log(typeof editIssue.eta);
</script>

<Dialog top
	><DialogBox class="sm:min-w-lg sm:w-1/2">
		<span slot="header">Issue</span>
		<Input bind:value={editIssue.title} placeholder="Title" />
		<Input bind:value={editIssue.comments} placeholder="Comments" />
		<div class="flex items-center">
			<InputDate bind:value={editIssue.etaInitial} type="date" placeholder="ETA"
				><span slot="label" class="ml-2 w-28">Initial ETA:</span></InputDate
			>
			{#if editIssue.etaInitial}<InputDate bind:value={editIssue.eta} type="date" placeholder="ETA"
					><span slot="label" class="ml-2 w-28">New ETA:</span></InputDate
				>{/if}
		</div>
		{#if editIssue.closeDate}
		<div class="flex items-center">
			<InputDate
				bind:value={editIssue.closeDate}
				type="date"
				placeholder="ETA"
				on:clickaction={() => (editIssue.closeDate = null)}
			>
				<span slot="label" class="ml-2 w-28">Close date:</span>
				<MdClear slot="action" />
			</InputDate>
		</div>
		{:else}
		<Button on:click={() => editIssue.closeDate = new Date()}>CLOSE ISSUE</Button>
		{/if}

		<div slot="actions" class="flex">
			<Button on:click={close} variant="cancel">close</Button>
			<div class="flex-1" />
			<Button on:click={remove} variant="cancel">delete</Button>
			<Button on:click={save} variant="confirm">
				{#if editIssue.id}save{:else}add{/if}
			</Button>
		</div>
	</DialogBox>
</Dialog>
