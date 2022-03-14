
import { objectToString, requestToObject, responseToObject } from '$lib/requesttools';
import { PrismaClient, type Task } from '@prisma/client'
import { parse } from 'superjson';


const prisma = new PrismaClient();


export async function get({ params }) {

  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  })
  return {
    body: objectToString(task)
  };
}

export async function post({ request, params }) {
  const data = await requestToObject<Partial<Task>>(request);
  const newTask = await prisma.task.create({
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

  const updateTask = await prisma.task.update({
    where: {
      id: parseInt(params.taskid),
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

    
     await prisma.task.delete({
      where: {
        id: parseInt(params.taskid),
      },
    })
   
    return {
      status: 200,
    };
  }