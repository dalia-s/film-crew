import { auth } from '@clerk/nextjs'
import { DateRange, FormFields, Project } from '@/types/index'
import { prisma } from '@/utils/prisma'

const defaultProject: Project = {
  projectId: undefined,
  projectName: '',
  projectDescription: '',
  projectStartDate: null,
  projectEndDate: null,
}

export async function getUserDetails(): Promise<FormFields> {
  const { userId } = auth()

  if (!userId) {
    throw new Error('Unauthorized')
  }

  const user = await prisma.user.findUniqueOrThrow({
    where: { clerkId: userId },
    include: {
      profile: true,
      availability: true,
      projects: true,
    },
  })

  const profession = user.profile?.profession || ''
  const experienceYears = user.profile ? String(user.profile?.experienceYears) : ''
  const hourlyRate = user.profile ? String(user.profile?.experienceYears) : ''
  let availabilityId
  let availability: DateRange = []
  if (user.availability.length) {
    availability = [user.availability[0].availableFrom, user.availability[0].availableTo]
    availabilityId = user.availability[0].id
  }
  let currentProject = defaultProject
  if (user.projects.length) {
    currentProject = {
      ...user.projects[0],
      projectId: user.projects[0].id,
    }
  }

  return {
    firstName: user.firstName,
    lastName: user.lastName,
    about: user.about,
    contactNo: user.contactNo,
    availability,
    availabilityId,
    profession,
    experienceYears,
    hourlyRate,
    ...currentProject,
  }
}

export async function saveUserDetails(data: FormFields) {
  const body = JSON.stringify(data)
  const resp = await fetch('/api/user_details', {
    method: 'PUT',
    body,
  })
  if (!resp.ok) {
    throw new Error(`Api has returned status code: ${resp.status}`)
  }
}
