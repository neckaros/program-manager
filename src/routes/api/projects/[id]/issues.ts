
import { objectToString, requestToObject } from '$lib/requesttools';
import { PrismaClient, type Milestone, type Task } from '@prisma/client'
import { parse } from 'superjson';


const prisma = new PrismaClient();


export async function get({ params }) {

  const allProjects = await prisma.issue.findMany({
    where: { projectId: parseInt(params.id) },
  })

  return {
    body: objectToString(allProjects)
  };
}

export async function post({ request, params }) {
  const data = await requestToObject<Partial<Task>>(request);
  const newIssue = await prisma.issue.create({
    data: {
      title: data.title,
      project: {
        connect: {
          id: parseInt(params.id)
        }
      }
    },
  })
  return {
    status: 200,
    body: 
      objectToString(newIssue)
  };
}