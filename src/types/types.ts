export type UserRole = 'producer' | 'crew'

export type Project = {
  projectName: string
  projectDescription: string
  projectStartDate: Date | null
  projectEndDate: Date | null
}

export type Qualifications = {
  profession: string
  experienceYears: string
  hourlyRate: string
}

export type UserDetails = {
  firstName: string
  lastName: string
  intro: string
  contactNo: string
  availability: string[]
  qualifications: Qualifications
  currentProject: Project
}

export type FormFields = UserDetails & Project & Qualifications

export type FormFieldKeys = keyof UserDetails | keyof Qualifications | keyof Project

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
