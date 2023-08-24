import { ReadonlyURLSearchParams } from 'next/navigation'
import { pageSearchParams } from './consts'
import { FormFields, UserDetails } from '@/types/types'

export function updateQueryParam(searchParams: ReadonlyURLSearchParams, name: string, value: string): string {
  const params = new URLSearchParams(Array.from(searchParams.entries()))
  if (value) {
    params.set(name, value)
  } else {
    params.delete(name)
  }
  // temp workaround for searchParams caching issue https://github.com/vercel/next.js/pull/47312
  const randomString = Math.random().toString()
  params.set(pageSearchParams.helper, randomString)

  return params.toString()
}

export function getUserDetailsFromFormFields(formFields: FormFields): UserDetails {
  const {
    firstName,
    lastName,
    intro,
    contactNo,
    availability,
    profession,
    experienceYears,
    hourlyRate,
    projectName,
    projectDescription,
    projectStartDate,
    projectEndDate,
  } = formFields

  return {
    firstName,
    lastName,
    intro,
    contactNo,
    availability,
    credentials: {
      profession,
      experienceYears,
      hourlyRate,
    },
    currentProject: {
      projectName,
      projectDescription,
      projectStartDate,
      projectEndDate,
    },
  }
}
