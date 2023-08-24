export type UserRole = 'producer' | 'crew' | 'admin'

export type Project = {
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

export type UserDetails = {
  firstName: string
  lastName: string
  about: string | null
  contactNo: string
  availability: string[]
  profile: Profile
  currentProject: Project
}

export type FormFields = UserDetails & Project & Profile

export type FormFieldKeys = keyof UserDetails | keyof Profile | keyof Project

export type CrewMember = {
  id: number
  name: string
  intro: string
  profession: string
  experienceYears: string
  hourlyRate: number
  availability: string
  contactNumber: string
}
