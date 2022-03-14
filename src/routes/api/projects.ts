import { objectToString, requestToObject } from '$lib/requesttools';
import { PrismaClient, type Project } from '@prisma/client'

const prisma = new PrismaClient();


export async function get({ params }) {

    const allProjects = await prisma.project.findMany({
      include: {
        issues: {where: {closeDate: null}},
        _count: {
          select: {milestones: true}
        }
      },
      
      })
    let retour = allProjects.map(p => {
      let r: any = {...p};
      r.issues = r.issues.length;
      r.milestones = p._count.milestones;
      return r;
    })

      return {
        body: objectToString(retour)
      };
    
   
    return {
      status: 404
    };
  }

  export async function post({ request }) {
    const data = await requestToObject<Partial<Project>>(request);
    const newPorject = await prisma.project.create({
        data: {
          title: data.title,
        },
      })
    
    return {
      status: 200,
      body: 
        objectToString(newPorject)
    };
  }