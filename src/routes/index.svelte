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
	const projectsStore = getContext<SvelteStore<ProjectsStore>>('projects');

	const addMilestone = (projectId: number) => {
		let title = prompt('Title of the milestone');
		if(title)
			axios.post(`/api/projects/${projectId}/milestones`, { title: title });
	};
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

	
	<div class="flex flex-col bg-gray-200 flex-1 justify-center items-center">
	Select a project
</div>