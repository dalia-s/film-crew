import { Role } from '@prisma/client'

const userNoData = {
  id: 123,
  clerkId: '',
  role: Role.ADMIN,
  firstName: '',
  lastName: '',
  about: '',
  email: '',
  contactNo: '',
  createdAt: new Date(),
  profile: {},
  availability: [],
  projects: [],
}

export const producerNoData = {
  ...userNoData,
  role: Role.PRODUCER,
}

export const crewNoData = {
  ...userNoData,
  role: Role.CREW,
}

export const producerWithData = {
  ...producerNoData,
  firstName: 'First Name',
  lastName: 'Last Name',
  about: 'Lorem ipsum...',
  projects: [
    {
      projectName: 'Project Name',
      projectDescription: 'Project Description',
      projectStartDate: new Date(),
      projectEndDate: new Date(),
    },
  ],
}
