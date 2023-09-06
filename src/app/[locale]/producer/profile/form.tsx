'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TextInput, TextArea, DatePicker, SubmitButton } from '@/components/forms'
import { saveUserDetails } from '@/utils/userService'
import { FormFields } from '@/types/index'

type Props = {
  userDetails: FormFields
}

export default function ProducerProfileForm({ userDetails }: Props) {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const t = useTranslations('Forms')

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    values: userDetails,
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      setSaving(true)
      await saveUserDetails(data)
      router.refresh()
      // TODO: show success message
    } catch (e) {
      // TODO: show error message
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-body" data-testid="producer-profile-form">
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
          name="about"
          placeholder={t('profileForm.introPlh')}
        />
        <h4>{t('profileForm.currentProjectSectionHeader')}</h4>
        <TextInput
          register={register}
          registerOptions={{
            validate: (value, formValues) =>
              !!value || (!formValues.projectDescription && !formValues.projectStartDate && !formValues.projectEndDate),
          }}
          label={t('profileForm.currentProjectName')}
          name="projectName"
          error={!!errors.projectName}
          errorMessage={t('profileForm.currentProjectNameErrM')}
          placeholder={t('profileForm.currentProjectNamePlh')}
        />
        <TextArea
          register={register}
          label={t('profileForm.currentProjectDescription')}
          name="projectDescription"
          placeholder={t('profileForm.currentProjectDescriptionPlh')}
        />
        <div className="row">
          <div className="column">
            <DatePicker
              control={control}
              name="projectStartDate"
              label={t('profileForm.currentProjectStartDate')}
              isClearable
            />
          </div>
          <div className="column">
            <DatePicker
              control={control}
              name="projectEndDate"
              label={t('profileForm.currentProjectEndDate')}
              isClearable
            />
          </div>
        </div>
        <SubmitButton text={t('submit')} saving={saving} />
      </form>
    </div>
  )
}
