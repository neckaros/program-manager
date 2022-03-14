
import { objectToString, requestToObject, responseToObject } from '$lib/requesttools';
import { PrismaClient, type Task } from '@prisma/client'
import { parse } from 'superjson';


const prisma = new PrismaClient();


export async function get({ params }) {

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  })
  return {
    body: objectToString(issue)
  };
}

export async function post({ request, params }) {
  const data = await requestToObject<Partial<Task>>(request);
  const newTask = await prisma.issue.create({
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
      objectToString(newTask)
    
  };
}

export async function patch({ request, params }) {

  const data = await requestToObject<Partial<Task>>(request);
  delete data.id;
  console.log(data, parseInt(params.issueid))
  const updateTask = await prisma.issue.update({
    where: {
      id: parseInt(params.issueid),
    },
    data: data,
  })
  console.log(updateTask)
  return {
    status: 200,
    body: objectToString(updateTask)
  };
}

export async function del({ params }) {

    
     await prisma.issue.delete({
      where: {
        id: parseInt(params.issueid),
      },
    })
   
    return {
      status: 200,
    };
  }