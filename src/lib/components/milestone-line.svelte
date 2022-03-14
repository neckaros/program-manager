<script lang="ts">
    import { responseToObject } from "$lib/requesttools";
    import MdEdit from 'svelte-icons/md/MdEdit.svelte'
    import MdWarning from 'svelte-icons/md/MdWarning.svelte'
    import MdInbox from 'svelte-icons/md/MdInbox.svelte'
    import type { Milestone } from "@prisma/client";
	import axios from 'axios';
    import superjson from 'superjson';

import MdAccessTime from 'svelte-icons/md/MdAccessTime.svelte'
import { getContext } from "svelte";
import type { ProjectFullStore } from "$lib/stores/project";
import DialogMilestone from "./DialogMilestone.svelte";
import { identity } from "svelte/internal";
    let editingEta = false;
    let showEdit = false;
    export let milestone: Milestone;
    let etaField: HTMLInputElement;

 

    const projectStore = getContext<ProjectFullStore>('project');
        
    const updateEta = async () => {
        editingEta = false;
        console.log(etaField?.valueAsNumber)
		projectStore.updateMilestone(milestone.id, { eta: etaField?.valueAsDate })
    };
</script>

<div class="font-normal flex items-center cursor-pointer">
    <div class="rounded-full {milestone.status == 0 ? 'bg-green-600' : milestone.status === 1 ? 'bg-orange-600' : 'bg-red-600'} h-4 w-4 mx-2" on:click={() =>projectStore.incrementMilestoneStatus(milestone.id)}/>
    <div class="flex-1" on:click={() => showEdit = true}>{milestone.title}</div>
    
    <div class="h-5 mx-2 flex items-center"><MdInbox/>0</div>
    
    <div class="h-5 mx-2 flex items-center"><MdWarning/>0</div>
    <div class="flex items-center">
        <div class="h-5 mx-2 "><MdAccessTime/></div>
        {#if (!milestone.etaInitial && !milestone.eta) || editingEta}
            <input type="date" bind:this={etaField} on:change={updateEta}/>
        {:else}
        <div class="cursor-pointer" on:click={() => editingEta = true}>{(milestone.eta ?? milestone.etaInitial).toLocaleDateString()}</div>
        {/if}
    </div>
</div>

{#if showEdit}
<DialogMilestone milestone={milestone} on:close={() => showEdit = false} on:remove={e => projectStore.removeMilestone(milestone.id)} on:save={e => {projectStore.updateMilestone(milestone.id, e.detail); showEdit = false;}}/>
{/if}