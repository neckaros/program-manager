import { createIssue, createMilestone, createTask, deleteIssue, deleteMilestone, getIssues, getMilestones, getProjects, getTasks, patchIssue, patchMilestone, patchTask } from "$lib/api/projects";
import type { Issue, Milestone, Project, Task } from "@prisma/client";
import { get, writable } from "svelte/store";
import type { ProjectsFullStore, ProjectsStore } from "./projects";
export interface ProjectStore {
    project: Project;
    tasks: Task[];
    issues: Issue[];
    milestones: Milestone[];
}

export interface ProjectActions {
    loadData: (projectId: number) => void;
    addMilestone: (milestone: Partial<Milestone>) => Promise<void>;
    removeMilestone: (milestoneId: number) => Promise<void>;
    updateMilestone: (milestoneId: number, milestone: Partial<Milestone>) => Promise<void>;
    incrementMilestoneStatus: (milestoneId: number) => Promise<void>;
    addTask: (task: Partial<Task>) => Promise<void>;
    removeTask: (milestoneId: number) => Promise<void>;
    updateTask: (milestoneId: number, milestone: Partial<Milestone>) => Promise<void>;
    incrementTaskStatus: (milestoneId: number) => Promise<void>;


    addIssue: (issue: Partial<Issue>) => Promise<void>;
    removeIssue: (milestoneId: number) => Promise<void>;
    updateIssue: (milestoneId: number, milestone: Partial<Milestone>) => Promise<void>;
    incrementIssueStatus: (milestoneId: number) => Promise<void>;
    destroy: () => void;
}

export type ProjectFullStore = SvelteStore<ProjectStore> & ProjectActions;

export function createProjectStore(project: number, ProjectsStore: ProjectsFullStore): ProjectFullStore {
    let projectId = project;
    const { subscribe, set, update } = writable<ProjectStore>(undefined);
    const sub = ProjectsStore.subscribe((p) => {
        const currentProject = p.projects.find(l => l.id === projectId);
        if (currentProject) {
            update(m => ({ ...m, project: currentProject }))
        }
    });

    const loadData = async (project: number) => {
        projectId = project;
        update(m => ({ ...m, project: get(ProjectsStore).projects.find(x => x.id === projectId) }))
        getMilestones(projectId).then(milestones => update(m => ({ ...m, milestones })));
        getTasks(projectId).then(tasks => update(m => ({ ...m, tasks })));
        getIssues(projectId).then(issues => update(m => ({ ...m, issues })));
    }

    const addMilestone = async (milestone: Partial<Milestone>) => {
        createMilestone(projectId, milestone).then(milestone => update(m => ({ ...m, milestones: [...m.milestones, milestone] })));
    }
    const removeMilestone = async (milestoneId: number) => {
        deleteMilestone(projectId, milestoneId).then(() => update(m => ({ ...m, milestones: m.milestones.filter(x => x.id !== milestoneId) })));
    }
    const incrementMilestoneStatus = async (milestoneId: number) => {
        const existingMilestone = get({ subscribe }).milestones.find(x => x.id === milestoneId);
        const milestone = { status: existingMilestone.status === 2 ? 0 : existingMilestone.status + 1 }
        patchMilestone(projectId, milestoneId, milestone).then(milestone => pushOrUpdateMilestone(milestone));
    }

    const updateMilestone = async (milestoneId: number, milestone: Partial<Milestone>) => {
        patchMilestone(projectId, milestoneId, milestone).then(milestone => pushOrUpdateMilestone(milestone));
    }
    const pushOrUpdateMilestone = async (milestone: Milestone) => {
        update(m => ({ ...m, milestones: m.milestones.some(x => x.id === milestone.id) ? m.milestones.map(x => x.id === milestone.id ? milestone : x) : [...m.milestones, milestone] }));
    }




    const addTask = async (task: Partial<Task>) => {
        createTask(projectId, task).then(task => update(m => ({ ...m, tasks: [...m.tasks, task] })));
    }

    const removeTask = async (taskId: number) => {
        deleteMilestone(projectId, taskId).then(() => update(m => ({ ...m, tasks: m.tasks.filter(x => x.id !== taskId) })));
    }
    const incrementTaskStatus = async (taskId: number) => {
        const existingTask = get({ subscribe }).tasks.find(x => x.id === taskId);
        const task = { status: existingTask.status === 2 ? 0 : existingTask.status + 1 }
        patchTask(projectId, taskId, task).then(task => pushOrUpdateTask(task));
    }
    const updateTask = async (taskId: number, task: Partial<Task>) => {
        patchTask(projectId, taskId, task).then(task => pushOrUpdateTask(task));
    }
    const pushOrUpdateTask = async (task: Task) => {
        update(m => ({ ...m, tasks: m.tasks.some(x => x.id === task.id) ? m.tasks.map(x => x.id === task.id ? task : x) : [...m.tasks, task] }));
    }



    const addIssue = async (issue: Partial<Issue>) => {
        createIssue(projectId, issue).then(issue => update(m => ({ ...m, issues: [...m.issues, issue] })));
    }

    const removeIssue = async (issueId: number) => {
        deleteIssue(projectId, issueId).then(() => update(m => ({ ...m, issues: m.issues.filter(x => x.id !== issueId) })));
    }
    const incrementIssueStatus = async (issueId: number) => {
        const existingIssue = get({ subscribe }).issues.find(x => x.id === issueId);
        const issue = { status: existingIssue.status === 2 ? 0 : existingIssue.status + 1 }
        console.log()
        patchIssue(projectId, issueId, issue).then(issue => pushOrUpdateIssue(issue));
    }
    const updateIssue = async (issueId: number, issue: Partial<Issue>) => {
        patchIssue(projectId, issueId, issue).then(issue => pushOrUpdateIssue(issue));
    }
    const pushOrUpdateIssue = async (issue: Issue) => {
        update(m => {
            const newState = { ...m, issues: m.issues.some(x => x.id === issue.id) ? m.issues.map(x => x.id === issue.id ? issue : x) : [...m.issues, issue] }
            ProjectsStore.refreshedIssues(projectId, newState.issues)
            return newState;
        });
    }

    loadData(projectId);
    return {
        subscribe,
        loadData,
        addMilestone,
        removeMilestone,
        incrementMilestoneStatus,
        updateMilestone,

        addTask,
        updateTask,
        removeTask,
        incrementTaskStatus,

        addIssue,
        updateIssue,
        removeIssue,
        incrementIssueStatus,

        destroy: () => { sub(); }
    };
}