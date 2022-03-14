<script lang="ts">
	import Header from '$lib/header/Header.svelte';
import { createProjectsStore } from '$lib/stores/projects';
import { setContext } from 'svelte';
import MdAddCircleOutline from 'svelte-icons/md/MdAddCircleOutline.svelte';
import MdAvTimer from 'svelte-icons/md/MdAvTimer.svelte';
import MdAttachMoney from 'svelte-icons/md/MdAttachMoney.svelte';
	import GoRepo from 'svelte-icons/go/GoRepo.svelte';
	import MdGolfCourse from 'svelte-icons/md/MdGolfCourse.svelte';
	import GoBeaker from 'svelte-icons/go/GoBeaker.svelte';
	import MdPeople from 'svelte-icons/md/MdPeople.svelte';
    import MdWarning from 'svelte-icons/md/MdWarning.svelte'
	import '../app.css';
import axios from 'axios';
import { goto } from '$app/navigation';
import { page } from '$app/stores';

	const projectsStore = createProjectsStore();
	setContext('projects', projectsStore);
		
	const addProject = () => {
		const title = prompt('Title')
		if(title && title !== '')
			projectsStore.addProject({title})
	};
</script>

<div class="flex min-h-screen">
	{#if $projectsStore && $projectsStore.projects !== undefined}
	<div class="w-72 xl:w-96 bg-pink-900 min-h-full text-white">
		<div class="flex items-center">
			<div class="font-bold text-2xl m-2 flex-1">Projects</div>
			<button class="h-6 mx-2" on:click={addProject}><MdAddCircleOutline /></button>
		</div>
		{#if $projectsStore.projects !== undefined}
			{#each $projectsStore.projects as project (project.id)}
				<div class="hover:bg-blue-400 {$page.params.projectid === project.id.toString() ? 'bg-blue-300' : ''} cursor-pointer" on:click={() => goto(`/projects/${project.id}`)}>
					<div class="rounded p-2 flex items-center justify-center ml-2">
						<div class="h-6 mx-1"><GoRepo /></div>
						<div class="flex-1 text-xl ">{project.title}</div>

						<div class="flex mx-5 items-center">
							<div class="h-6 mr-1"><MdGolfCourse /></div>
							<span>{project.milestones ?? 0}</span>
							<div class="h-6 ml-2"><MdWarning /></div>
							<span>{project.issues ?? 0}</span>
						</div>

						<div class="h-6 text-green-500 mx-1"><MdPeople /></div>
						<div class="h-6 text-green-500 mx-1"><MdAvTimer /></div>
						<div class="h-6 text-green-500 mx-1"><MdAttachMoney /></div>
					</div>
				</div>
			{/each}
		{/if}
	</div>
<slot />
{:else}
Loading
{/if}
</div>
<style>

</style>
