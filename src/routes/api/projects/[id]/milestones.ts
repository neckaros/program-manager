
import { objectToString, requestToObject, responseToObject } from '$lib/requesttools';
import { PrismaClient, type Milestone } from '@prisma/client'
import { parse } from 'superjson';


const prisma = new PrismaClient();


export async function get({ params }) {

  const milestones = await prisma.milestone.findMany({
    where: { projectId: parseInt(params.id) },
  })
  return {
    body: objectToString(milestones)
  };
}

export async function post({ request, params }) {
  const data = await requestToObject<Partial<Milestone>>(request);
  const newMilestone = await prisma.milestone.create({
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
      objectToString(newMilestone)
    
  };
}
