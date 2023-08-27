import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs'
import { prisma } from '@/utils/prisma'
import { FormFields } from '@/types/index'

function formatRequestData(data: FormFields) {
  const profile = {
    profession: data.profession || null,
    experienceYears: data.experienceYears ? Number(data.experienceYears) : null,
    hourlyRate: data.hourlyRate === '' ? null : Number(data.experienceYears),
  }

  const project = {
    projectName: data.projectName,
    projectDescription: data.projectDescription,
    projectStartDate: data.projectStartDate,
    projectEndDate: data.projectEndDate,
  }

  const availability = {
    availableFrom: data.availability.length ? data.availability[0] : null,
    availableTo: data.availability.length ? data.availability[1] : null,
  }

  const optionlData = {
    projects: {},
    availability: {},
  }

  if (data.projectName) {
    if (!data.projectId) {
      optionlData.projects = { create: { ...project } }
    } else {
      optionlData.projects = {
        update: {
          where: { id: data.projectId },
          data: { ...project },
        },
      }
    }
  }

  if (data.availability.length) {
    if (!data.availabilityId) {
      optionlData.availability = { create: { ...availability } }
    } else {
      optionlData.availability = {
        update: {
          where: { id: data.availabilityId },
          data: { ...availability },
        },
      }
    }
  }

  return {
    firstName: data.firstName,
    lastName: data.lastName,
    about: data.about,
    contactNo: data.contactNo,
    profile: {
      upsert: {
        create: { ...profile },
        update: { ...profile },
      },
    },
    ...optionlData,
  }
}

export async function PUT(request: Request) {
  const { userId } = auth()
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data: FormFields = await request.json()

    await prisma.user.update({
      where: { clerkId: userId },
      data: { ...formatRequestData(data) },
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }

  return NextResponse.json({ status: 200 })
}
