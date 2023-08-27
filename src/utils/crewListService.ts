import { Role, Prisma } from '@prisma/client'
import { prisma } from '@/utils/prisma'
import { CrewListItem, DBAvailability, CrewSearchParams } from '@/types/index'
import { experienceOptions } from '@/utils/consts'

function getExperienceStr(exp: number): string {
  const experience = experienceOptions.find((e) => e.value === String(exp))
  return experience?.name || ''
}

function formatAvailability(avail: DBAvailability): string {
  return `${avail.availableFrom.toLocaleDateString('lt')} - ${avail.availableTo.toLocaleDateString('lt')}`
}

function getSearchFilter(search: string | undefined): Prisma.UserWhereInput {
  if (search) {
    return {
      OR: [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { about: { contains: search, mode: 'insensitive' } },
      ],
    }
  }
  return {}
}

function getProfileFilter({ profession, experience, minRate, maxRate }: CrewSearchParams): Prisma.UserWhereInput {
  const prof = profession ? { profession: { in: profession.split(',') } } : {}
  const exp = experience ? { experienceYears: { in: experience.split(',').map((e) => Number(e)) } } : {}
  const minR = minRate ? { gte: Number(minRate) } : {}
  const maxR = maxRate ? { lte: Number(maxRate) } : {}
  const hRate = { hourlyRate: { ...minR, ...maxR } }

  return {
    profile: {
      ...prof,
      ...exp,
      ...hRate,
    },
  }
}

function getAvailabilityFilter({ availableFrom, availableTo }: CrewSearchParams): Prisma.UserWhereInput {
  const availFrom = availableFrom ? { availableFrom: { gte: new Date(availableFrom) } } : {}
  const availTo = availableTo ? { availableTo: { gte: new Date(availableTo) } } : {}
  return {
    availability: {
      some: {
        ...availFrom,
        ...availTo,
      },
    },
  }
}

function getFilters(searchParams: CrewSearchParams): Prisma.UserWhereInput {
  return {
    ...getSearchFilter(searchParams.search),
    ...getProfileFilter(searchParams),
    ...getAvailabilityFilter(searchParams),
  }
}

export async function getCrewList(searchParams: CrewSearchParams): Promise<CrewListItem[]> {
  const filter = getFilters(searchParams)

  const data = await prisma.user.findMany({
    where: {
      ...filter,
      role: Role.CREW,
    },
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
