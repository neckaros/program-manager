import { Prisma, type Project } from '@prisma/client'

// 1: Define a type that includes the relation to `Post`
const projectWithMilestones = Prisma.validator<Prisma.ProjectArgs>()({
  include: { milestones: true },
})
const fullProject = Prisma.validator<Prisma.ProjectArgs>()({
  include: { milestones: true, tasks: true },
})
const projectWithInfos = Prisma.validator<Prisma.ProjectArgs>()({
  include: {
    _count: {
      select: { issues: true, tasks: true, milestones: true },
    },
  },
})


// 3: This type will include a user and all their posts
export type projectWithMilestones = Prisma.ProjectGetPayload<typeof projectWithMilestones>


export type projectWithInfos = Project & {issues: number, milestones: number}

export type fullProject = Prisma.ProjectGetPayload<typeof fullProject>