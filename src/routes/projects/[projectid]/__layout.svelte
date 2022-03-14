<script lang="ts">
import { page } from "$app/stores";

import { createProjectStore } from "$lib/stores/project";
import type { ProjectsFullStore, ProjectsStore } from "$lib/stores/projects";
import axios from "axios";
import { getContext, onDestroy, setContext } from "svelte";
import { get } from "svelte/store";


const projectsStore = getContext<ProjectsFullStore>('projects');

	const projectStore = createProjectStore(parseInt($page.params.projectid), projectsStore);
	const unsub = page.subscribe(p => {
		if(p.params.projectid && p.params.projectid !== get(projectStore).project.id.toString()) {
			projectStore.loadData(parseInt(p.params.projectid))
		}
	});
	setContext('project', projectStore);
	onDestroy(() => {
		projectStore.destroy();
		unsub();
		});
</script>


<slot />