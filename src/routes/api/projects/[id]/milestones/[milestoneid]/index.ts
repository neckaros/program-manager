
import { objectToString, requestToObject, responseToObject } from '$lib/requesttools';
import { PrismaClient, type Milestone } from '@prisma/client'
import { parse } from 'superjson';


const prisma = new PrismaClient();


export async function get({ params }) {

  const milestone = await prisma.milestone.findUnique({
    where: { id: parseInt(params.id) },
  })
  return {
    body: objectToString(milestone)
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

export async function patch({ request, params }) {

  const data = await requestToObject<Partial<Milestone>>(request);
  delete data.id;

  const updateMilestone = await prisma.milestone.update({
    where: {
      id: parseInt(params.milestoneid),
    },
    data: data,
  })
  console.log(updateMilestone)
  return {
    status: 200,
    body: objectToString(updateMilestone)
  };
}

export async function del({ params }) {

    
     await prisma.milestone.delete({
      where: {
        id: parseInt(params.milestoneid),
      },
    })
   
    return {
      status: 200,
    };
  }