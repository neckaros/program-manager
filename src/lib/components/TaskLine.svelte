<script lang="ts">
    import { responseToObject } from "$lib/requesttools";
    import MdEdit from 'svelte-icons/md/MdEdit.svelte'
    import MdWarning from 'svelte-icons/md/MdWarning.svelte'
    import MdInbox from 'svelte-icons/md/MdInbox.svelte'
    import type { Task } from "@prisma/client";
	import axios from 'axios';
    import superjson from 'superjson';

import MdAccessTime from 'svelte-icons/md/MdAccessTime.svelte'
import { getContext } from "svelte";
import type { ProjectFullStore } from "$lib/stores/project";
import DialogTask from "./DialogTask.svelte";
import { identity } from "svelte/internal";
    let editingEta = false;
    let showEdit = false;
    export let task: Task;
    let etaField: HTMLInputElement;

 

    const projectStore = getContext<ProjectFullStore>('project');
        
    const updateEta = async () => {
        editingEta = false;
        console.log(etaField?.valueAsNumber)
		projectStore.updateTask(task.id, { eta: etaField?.valueAsDate })
    };
</script>

<div class="font-normal flex items-center cursor-pointer">
    <div class="rounded-full {task.status == 0 ? 'bg-green-600' : task.status === 1 ? 'bg-orange-600' : 'bg-red-600'} h-4 w-4 mx-2" on:click={() =>projectStore.incrementTaskStatus(task.id)}/>
    <div class="flex-1" on:click={() => showEdit = true}>{task.title}</div>
    
    <div class="h-5 mx-2 flex items-center"><MdInbox/>0</div>
    
    <div class="h-5 mx-2 flex items-center"><MdWarning/>0</div>
    <div class="flex items-center">
        <div class="h-5 mx-2 "><MdAccessTime/></div>
        {#if (!task.etaInitial && !task.eta) || editingEta}
            <input type="date" bind:this={etaField} on:change={updateEta}/>
        {:else}
        <div class="cursor-pointer" on:click={() => editingEta = true}>{(task.eta ?? task.etaInitial).toLocaleDateString()}</div>
        {/if}
    </div>
</div>

{#if showEdit}
<DialogTask task={task} on:close={() => showEdit = false} on:remove={e => projectStore.removeTask(task.id)} on:save={e => {projectStore.updateTask(task.id, e.detail); showEdit = false;}}/>
{/if}