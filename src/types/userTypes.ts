import { Prisma } from '@prisma/client'
import { crewListParams } from '@/utils/consts'

export type UserRole = 'producer' | 'crew' | 'admin'

export type DateRange = [Date | null, Date | null] | []

type UserDetails = {
  firstName: string
  lastName: string
  about: string | null
  contactNo: string
}

export type Project = {
  projectId: number | undefined
  projectName: string
  projectDescription: string | null
  projectStartDate: Date | null
  projectEndDate: Date | null
}

type Profile = {
  profession: string | null
  experienceYears: string | null
  hourlyRate: string | null
}

type Availability = {
  availability: DateRange
  availabilityId: number | undefined
}

export type FormFields = Availability & UserDetails & Project & Profile

export type FormFieldKeys = keyof FormFields

export type DBAvailability = {
  availableFrom: Date
  availableTo: Date
}

type DBProfile = {
  profession: string | null
  experienceYears: number | null
  hourlyRate: Prisma.Decimal | null
}

export type CrewListRawDataItem = UserDetails & {
  clerkId: string
  profile: DBProfile | null
  availability: DBAvailability[]
}

export type CrewListItem = Profile & {
  clerkId: string
  name: string
  about: string
  contactNo: string
  availability: string
}

export type CrewSearchParams = typeof crewListParams
