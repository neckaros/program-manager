<script lang="ts">
    import { responseToObject } from "$lib/requesttools";
    import MdEdit from 'svelte-icons/md/MdEdit.svelte'
    import MdWarning from 'svelte-icons/md/MdWarning.svelte'
    import MdInbox from 'svelte-icons/md/MdInbox.svelte'
    import type { Issue } from "@prisma/client";
    import MdCheck from 'svelte-icons/md/MdCheck.svelte'
	import axios from 'axios';
    import superjson from 'superjson';

import MdAccessTime from 'svelte-icons/md/MdAccessTime.svelte'
import { getContext } from "svelte";
import type { ProjectFullStore } from "$lib/stores/project";
import DialogIssue from "./DialogIssue.svelte";
import { identity } from "svelte/internal";
    let editingEta = false;
    let showEdit = false;
    export let issue: Issue;
    let etaField: HTMLInputElement;

 

    const projectStore = getContext<ProjectFullStore>('project');
        
    const updateEta = async () => {
        editingEta = false;
        console.log(etaField?.valueAsNumber)
		projectStore.updateIssue(issue.id, { eta: etaField?.valueAsDate })
    };
</script>

<div class="font-normal flex items-center cursor-pointer">
    {#if !issue.closeDate}
    <div class="rounded-full {issue.status == 0 ? 'bg-green-600' : issue.status === 1 ? 'bg-orange-600' : 'bg-red-600'} h-4 w-4 mx-2" on:click={() =>projectStore.incrementIssueStatus(issue.id)}/>
    {:else} 
    <div class=" text-green-600 h-4 w-4 mx-2" ><MdCheck /></div>
    {/if}
    
    <div class="flex-1" on:click={() => showEdit = true}>{issue.title}</div>

    <div class="flex items-center">
        <div class="h-5 mx-2 "><MdAccessTime/></div>
        {#if (!issue.etaInitial && !issue.eta) || editingEta}
            <input type="date" bind:this={etaField} on:change={updateEta}/>
        {:else}
        <div class="cursor-pointer" on:click={() => editingEta = true}>{(issue.eta ?? issue.etaInitial).toLocaleDateString()}</div>
        {/if}
    </div>
</div>

{#if showEdit}
<DialogIssue issue={issue} on:close={() => showEdit = false} on:remove={e => projectStore.removeIssue(issue.id)} on:save={e => {projectStore.updateIssue(issue.id, e.detail); showEdit = false;}}/>
{/if}