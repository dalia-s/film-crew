'use client'

import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useUser } from '@clerk/nextjs'
import { TextInput, TextArea, DatePicker } from '@/components/forms'

// type Inputs = {
//   firstName: string
//   lastName: string
//   intro: string
//   currentProjectName: string
//   currentProjectDescription: string
//   currentProjectStartDate: string
//   currentProjectEndDate: string
// }

export default function ProducerForm() {
  const t = useTranslations('Forms')
  const { user } = useUser() // need to get ALL user data if user exist, if not, use the name only, from auth probably in BE

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    intro: '',
    currentProjectName: '',
    currentProjectDescription: '',
    currentProjectStartDate: '',
    currentProjectEndDate: '',
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    values: defaultValues,
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
    // save data and depending on the selection redirect to appropriate profile page
    // router.push(`/${loc}/crew/profile`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-body">
        <div className="row">
          <div className="column">
            <TextInput
              register={register}
              registerOptions={{ required: true }}
              label="First name"
              name="firstName"
              error={!!errors.firstName}
              errorMessage="Please enter your first name."
              placeholder="First name"
            />
          </div>
          <div className="column">
            <TextInput
              register={register}
              registerOptions={{ required: true }}
              label="Last name"
              name="lastName"
              error={!!errors.lastName}
              errorMessage="Please enter your last name."
              placeholder="Last name"
            />
          </div>
        </div>
        <TextArea
          register={register}
          registerOptions={{ required: false }}
          label="Introduce yourself"
          name="intro"
          placeholder="Tell us a little about yourself."
        />
        <TextInput
          register={register}
          registerOptions={{ required: true }}
          label="Your current project name"
          name="currentProjectName"
          error={!!errors.currentProjectName}
          errorMessage="Please enter your current project name."
          placeholder="Project name"
        />
        <TextArea
          register={register}
          label="Your project description"
          name="currentProjectDescription"
          placeholder="Tell us a little about your project."
        />
        <div className="row">
          <div className="column">
            <DatePicker control={control} name="currentProjectStartDate" label="Project start date" isClearable />
          </div>
          <div className="column">
            <DatePicker control={control} name="currentProjectEndDate" label="Project end date" isClearable />
          </div>
        </div>
        <button type="submit" className="button primary submit-button">
          {t('submit')}
        </button>
      </form>
    </div>
  )
}
