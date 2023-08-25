import { Role } from '@prisma/client'
import { prisma } from '@/utils/prisma'
import { CrewListItem, DBAvailability } from '@/types/types'
import { experienceOptions } from '@/utils/consts'

function getExperienceStr(exp: number): string {
  const experience = experienceOptions.find((e) => e.value === String(exp))
  return experience?.name || ''
}

function formatAvailability(avail: DBAvailability): string {
  return `${avail.availableFrom.toLocaleDateString('lt')} - ${avail.availableTo.toLocaleDateString('lt')}`
}

export async function getCrewList() {
  const data = await prisma.user.findMany({
    where: { role: Role.CREW },
    select: {
      clerkId: true,
      firstName: true,
      lastName: true,
      about: true,
      contactNo: true,
      profile: {
        select: {
          profession: true,
          experienceYears: true,
          hourlyRate: true,
        },
      },
      availability: {
        select: {
          availableFrom: true,
          availableTo: true,
        },
      },
    },
  })

  const users: CrewListItem[] = data.map((item) => ({
    clerkId: item.clerkId,
    name: `${item.firstName} ${item.lastName}`,
    about: item.about || '',
    contactNo: item.contactNo || '',
    availability: item.availability.length ? formatAvailability(item.availability[0]) : '',
    profession: item.profile?.profession || '',
    experienceYears: item.profile?.experienceYears ? getExperienceStr(item.profile?.experienceYears) : '',
    hourlyRate: item.profile?.hourlyRate ? item.profile.hourlyRate.toFixed(2) : '',
  }))

  return users
}
