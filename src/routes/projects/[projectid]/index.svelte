<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import axios from 'axios';
	import MdAddCircleOutline from 'svelte-icons/md/MdAddCircleOutline.svelte';

	import { getContext, onMount } from 'svelte';
	import type { projectWithMilestones } from 'src/types/project';
	import MilestoneLine from '$lib/components/milestone-line.svelte';
	import { responseToObject } from '$lib/requesttools';
import type { ProjectsStore } from '$lib/stores/projects';
import type { ProjectFullStore, ProjectStore } from '$lib/stores/project';
import DialogMilestone from '$lib/components/DialogMilestone.svelte';
import type { Issue, Milestone, Task } from '@prisma/client';
import TaskLine from '$lib/components/TaskLine.svelte';
import IssueLine from '$lib/components/IssueLine.svelte';
import DialogIssue from '$lib/components/DialogIssue.svelte';
import DialogTask from '$lib/components/DialogTask.svelte';


	const projectStore = getContext<ProjectFullStore>('project');

	let showAddMilestone = false;
	const addMilestone = (milestone: Partial<Milestone>) => {
		projectStore.addMilestone(milestone);
		showAddMilestone = false;
	};
	let showAddIssue = false;
	const addIssue = (issue: Partial<Issue>) => {
		projectStore.addIssue(issue);
		showAddIssue = false;
	};
	let showAddTask = false;
	const addTask = (task: Partial<Task>) => {
		projectStore.addTask(task);
		showAddTask = false;
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

	
	<div class="grid grid-cols-1 content-start 2xl:grid-cols-2 bg-gray-200 flex-1 justify-start min-h-screen">
	<section class="p-2 bg-gray-200 w-full">
		<div class="w-full rounded-lg drop-shadow bg-white">
			<div class="text-2xl m-2 flex p-2">
				<span class="flex-1">Milestones</span><button class="h-8 hover:text-blue-400" on:click={() => showAddMilestone = true}
					><MdAddCircleOutline /></button
				>
			</div>
			{#if $projectStore.milestones !== undefined}
				{#each $projectStore.milestones as milestone (milestone.id)}
					<div class="border-gray-500 border-t p-2"><MilestoneLine {milestone} /></div>
				{/each}
			{/if}
		</div>
	</section>
	<section class="p-2  ">
		<div class="w-full rounded-lg drop-shadow bg-white">
			<div class="text-2xl m-2 flex p-2">
				<span class="flex-1">Issues</span><button class="h-8 hover:text-blue-400" on:click={() => showAddIssue = true}
					><MdAddCircleOutline /></button
				>
			</div>
			{#if $projectStore.issues !== undefined}
				{#each $projectStore.issues as issue (issue.id)}
					<div class="border-gray-500 border-t p-2"><IssueLine {issue} /></div>
				{/each}
			{/if}
		</div>
	</section>
	<section class="p-2  ">
		<div class="w-full rounded-lg drop-shadow bg-white">
			<div class="text-2xl m-2 flex p-2">
				<span class="flex-1">Tasks</span><button class="h-8 hover:text-blue-400" on:click={() => showAddTask = true} 
					><MdAddCircleOutline /></button
				>
			</div>
			{#if $projectStore.tasks !== undefined}
				{#each $projectStore.tasks as task (task.id)}
					<div class="border-gray-500 border-t p-2"><TaskLine {task} /></div>
				{/each}
			{/if}
		</div>
	</section>
</div>
{#if showAddMilestone}
<DialogMilestone milestone={{}} on:close={() => showAddMilestone = false} on:save={(e) => addMilestone(e.detail)}/>
{/if}
{#if showAddIssue}
<DialogIssue issue={{}} on:close={() => showAddMilestone = false} on:save={(e) => addIssue(e.detail)}/>
{/if}
{#if showAddTask}
<DialogTask task={{}} on:close={() => showAddMilestone = false} on:save={(e) => addTask(e.detail)}/>
{/if}