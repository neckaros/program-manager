<script lang="ts">
	import { createEventDispatcher, getContext } from 'svelte';
	import Dialog from './Dialog.svelte';
	import Button from './Button.svelte';
	import DialogBox from './DialogBox.svelte';
	import { writable } from 'svelte/store';
	import Input from './Input.svelte';
import type { Milestone } from '@prisma/client';
import InputDate from './InputDate.svelte';
    export let milestone: Partial<Milestone>;
    let editMilestone = {...milestone};
	const dispatch = createEventDispatcher();

	const close = async () => {
		dispatch('close');
	};
    const save = async () => {
        if(editMilestone.title && editMilestone.title !== '')
		    dispatch('save', editMilestone);
        else 
            alert('At least a title is necessary')
	};
    const remove = async () => {
        if(confirm('Are you sure you want to delete this milestone and all associated tasks and alerts?'))
		    dispatch('remove', editMilestone.id);

	};
    console.log(typeof editMilestone.eta)
</script>

<Dialog top
	><DialogBox class="sm:min-w-lg sm:w-1/2">
		<span slot="header">Milestone</span>
		<Input bind:value={editMilestone.title} placeholder="Title" />
        <div class="flex items-center"><InputDate bind:value={editMilestone.etaInitial} type="date" placeholder="ETA"><span slot="label" class="ml-2">Initial ETA:</span></InputDate>
	{#if editMilestone.etaInitial}<InputDate bind:value={editMilestone.eta} type="date" placeholder="ETA"><span slot="label" class="ml-2">New ETA:</span></InputDate>{/if}
        </div>

		<div slot="actions" class="flex">
			<Button on:click={close} variant="cancel">close</Button>
			<div class="flex-1" />			
            <Button on:click={remove} variant="cancel">
                delete
            </Button>
			<Button on:click={save} variant="confirm">
                {#if editMilestone.id}save{:else}add{/if}
            </Button>
		</div>
	</DialogBox>
</Dialog>
