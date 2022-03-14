import { createProject, getProjects } from "$lib/api/projects";
import type { Issue, Project } from "@prisma/client";
import type { projectWithInfos, projectWithMilestones } from "src/types/project";
import { get, writable } from "svelte/store";
export interface ProjectsStore {
    projects: projectWithInfos[];
}

export interface ProjectsActions {
    loadProjects: () => void;
    addProject: (newProject: Partial<Project>) => Promise<void>;
    refreshedIssues: (projectId: number, newIssues: Partial<Issue[]>) => void;
}

export type ProjectsFullStore = SvelteStore<ProjectsStore> & ProjectsActions;

export function createProjectsStore(): ProjectsFullStore {
	const { subscribe, set, update } = writable<ProjectsStore>(undefined);


    const loadProjects = async () => {
        const projects = await getProjects();
        update(m => ({...m, projects}))
    }
    const addProject = async (newProject: Partial<Project>) => {
        createProject(newProject).then(project => update(m => ({...m, projects: [...m.projects, project]})));
    }

    const refreshedIssues = (projectId: number, newIssues: Partial<Issue[]>) => {
        update(m => {
            m.projects = m.projects.map(p => {
                if(projectId === p.id) {
                    p = {...p};
                    p.issues = newIssues.filter(x => !x.closeDate).length;
                    console.log(p)
                }
                return p;
            })

            return m;
        })
    }

    loadProjects();
	return {
		subscribe,
		loadProjects,
        addProject,

        refreshedIssues,
	};
}