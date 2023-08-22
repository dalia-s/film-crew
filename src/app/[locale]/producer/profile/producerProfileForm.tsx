'use client'

import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useUser } from '@clerk/nextjs'
import { TextInput, TextArea, DatePicker } from '@/components/forms'

export default function ProducerProfileForm() {
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
    // router.push(`/crew/profile`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-body">
        <div className="row">
          <div className="column">
            <TextInput
              register={register}
              registerOptions={{ required: true }}
              label={t('profileForm.firstName')}
              name="firstName"
              error={!!errors.firstName}
              errorMessage={t('profileForm.firstNameErrM')}
              placeholder={t('profileForm.firstName')}
            />
          </div>
          <div className="column">
            <TextInput
              register={register}
              registerOptions={{ required: true }}
              label={t('profileForm.lastName')}
              name="lastName"
              error={!!errors.lastName}
              errorMessage="Please enter your last name."
              placeholder={t('profileForm.lastName')}
            />
          </div>
        </div>
        <TextArea
          register={register}
          registerOptions={{ required: false }}
          label={t('profileForm.intro')}
          name="intro"
          placeholder={t('profileForm.introPlh')}
        />
        <TextInput
          register={register}
          registerOptions={{ required: true }}
          label={t('profileForm.currentProjectName')}
          name="currentProjectName"
          error={!!errors.currentProjectName}
          errorMessage={t('profileForm.currentProjectNameErrM')}
          placeholder={t('profileForm.currentProjectNamePlh')}
        />
        <TextArea
          register={register}
          label={t('profileForm.currentProjectDescription')}
          name="currentProjectDescription"
          placeholder={t('profileForm.currentProjectDescriptionPlh')}
        />
        <div className="row">
          <div className="column">
            <DatePicker
              control={control}
              name="currentProjectStartDate"
              label={t('profileForm.currentProjectStartDate')}
              isClearable
            />
          </div>
          <div className="column">
            <DatePicker
              control={control}
              name="currentProjectEndDate"
              label={t('profileForm.currentProjectEndDate')}
              isClearable
            />
          </div>
        </div>
        <button type="submit" className="button primary submit-button">
          {t('submit')}
        </button>
      </form>
    </div>
  )
}
