export type UserRole = 'producer' | 'crew' | 'admin'

export type DateRange = [Date | null, Date | null] | []

type UserDetails = {
  firstName: string
  lastName: string
  about: string | null
  contactNo: string
}

type Project = {
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

export type CrewListItem = Profile & {
  clerkId: string
  name: string
  about: string
  contactNo: string
  availability: string
}
