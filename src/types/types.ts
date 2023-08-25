export type UserRole = 'producer' | 'crew' | 'admin'

export type DateRange = [Date | null, Date | null] | []

export type UserDetails = {
  firstName: string
  lastName: string
  about: string | null
  contactNo: string
  availability: DateRange
  availabilityId: number | undefined
}

export type Project = {
  projectId: number | undefined
  projectName: string
  projectDescription: string | null
  projectStartDate: Date | null
  projectEndDate: Date | null
}

export type Profile = {
  profession: string
  experienceYears: string
  hourlyRate: string
}

export type FormFields = UserDetails & Project & Profile

export type FormFieldKeys = keyof FormFields

export type CrewMember = {
  id: number
  name: string
  intro: string
  profession: string
  experienceYears: number
  hourlyRate: number
  availability: string
  contactNumber: string
}
