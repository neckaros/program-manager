<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import Dialog from './Dialog.svelte';
	import Button from './Button.svelte';
	import DialogBox from './DialogBox.svelte';
	import { writable } from 'svelte/store';
	import Input from './Input.svelte';
import type { Task } from '@prisma/client';
import InputDate from './InputDate.svelte';
    export let task: Partial<Task>;
    let editTask = {...task};
	const dispatch = createEventDispatcher();

	const close = async () => {
		dispatch('close');
	};
    const save = async () => {
        if(editTask.title && editTask.title !== '')
		    dispatch('save', editTask);
        else 
            alert('At least a title is necessary')
	};
    const remove = async () => {
        if(confirm('Are you sure you want to delete this task and all associated tasks and alerts?'))
		    dispatch('remove', editTask.id);

	};
    console.log(typeof editTask.eta)
</script>

<Dialog top
	><DialogBox class="sm:min-w-lg sm:w-1/2">
		<span slot="header">Task</span>
		<Input bind:value={editTask.title} placeholder="Title" />
		<Input bind:value={editTask.comments} placeholder="Comments" />
        <div class="flex items-center"><InputDate bind:value={editTask.etaInitial} type="date" placeholder="ETA"><span slot="label" class="ml-2">Initial ETA:</span></InputDate>
	{#if editTask.etaInitial}<InputDate bind:value={editTask.eta} type="date" placeholder="ETA"><span slot="label" class="ml-2">New ETA:</span></InputDate>{/if}
        </div>

		<div slot="actions" class="flex">
			<Button on:click={close} variant="cancel">close</Button>
			<div class="flex-1" />			
            <Button on:click={remove} variant="cancel">
                delete
            </Button>
			<Button on:click={save} variant="confirm">
                {#if editTask.id}save{:else}add{/if}
            </Button>
		</div>
	</DialogBox>
</Dialog>
