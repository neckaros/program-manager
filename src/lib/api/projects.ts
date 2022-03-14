import { objectToString, responseToObject } from "$lib/requesttools";
import type { Issue, Milestone, Project, Task } from "@prisma/client";
import axios from "axios";
import type { projectWithInfos, projectWithMilestones } from "src/types/project";



export const createProject = async (newProject: Partial<Project>): Promise<projectWithInfos> => {
    const project = await axios.post(`http://localhost:3002/api/projects`, objectToString(newProject)).then((d) => responseToObject<projectWithInfos>(d));
    return project;
}
export const getProjects = async (): Promise<projectWithInfos[]> => {
    try {
    const projects = await axios.get('http://localhost:3002/api/projects').then((d) => responseToObject<projectWithInfos[]>(d));
    return projects;
    } catch(e) {
        console.error(e);
        return [];
    }
};

export const getMilestones = async (projectId: number): Promise<Milestone[]> => {
    const milestones = await axios.get(`http://localhost:3002/api/projects/${projectId}/milestones`).then((d) => responseToObject<Milestone[]>(d));
    return milestones;
}

export const createMilestone = async (projectId: number, milestone: Partial<Milestone>): Promise<Milestone> => {
    const milestones = await axios.post(`http://localhost:3002/api/projects/${projectId}/milestones`, objectToString(milestone)).then((d) => responseToObject<Milestone>(d));
    return milestones;
}
export const deleteMilestone = async (projectId: number, milestoneId: number): Promise<void> => {
    const milestones = await axios.delete(`http://localhost:3002/api/projects/${projectId}/milestones/${milestoneId}`);
}
export const patchMilestone = async (projectId: number, milestoneId: number, milestone: Partial<Milestone>): Promise<Milestone> => {
    const newMilestone = await axios.patch(`http://localhost:3002/api/projects/${projectId}/milestones/${milestoneId}`, objectToString(milestone)).then((d) => responseToObject<Milestone>(d));
    return newMilestone;
}



export const getTasks = async (projectId: number): Promise<Task[]> => {
    const tasks = await axios.get(`http://localhost:3002/api/projects/${projectId}/tasks`).then((d) => responseToObject<Task[]>(d));
    return tasks;
}

export const createTask = async (projectId: number, task: Partial<Task>): Promise<Task> => {
    const newTask = await axios.post(`http://localhost:3002/api/projects/${projectId}/tasks`, objectToString(task)).then((d) => responseToObject<Task>(d));
    return newTask;
}

export const deleteTask = async (projectId: number, taskId: number): Promise<void> => {
    await axios.delete(`http://localhost:3002/api/projects/${projectId}/tasks/${taskId}`);
}
export const patchTask = async (projectId: number, taskId: number, task: Partial<Task>): Promise<Task> => {
    const newTask = await axios.patch(`http://localhost:3002/api/projects/${projectId}/tasks/${taskId}`, objectToString(task)).then((d) => responseToObject<Task>(d));
    return newTask;
}


export const getIssues = async (projectId: number): Promise<Issue[]> => {
    const issues = await axios.get(`http://localhost:3002/api/projects/${projectId}/issues`).then((d) => responseToObject<Issue[]>(d));
    return issues;
}

export const createIssue = async (projectId: number, issue: Partial<Issue>): Promise<Task> => {
    const newIssue = await axios.post(`http://localhost:3002/api/projects/${projectId}/issues`, objectToString(issue)).then((d) => responseToObject<Issue>(d));
    return newIssue;
}

export const deleteIssue = async (projectId: number, issueId: number): Promise<void> => {
    await axios.delete(`http://localhost:3002/api/projects/${projectId}/issues/${issueId}`);
}
export const patchIssue = async (projectId: number, issueId: number, issue: Partial<Issue>): Promise<Task> => {
    const newTask = await axios.patch(`http://localhost:3002/api/projects/${projectId}/issues/${issueId}`, objectToString(issue)).then((d) => responseToObject<Issue>(d));
    return newTask;
}