'use client'

import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'
import { TextInput, TextArea, DateRangePicker, SingleSelect } from '@/components/forms'
import { getProfessionSingleSelectOptions, getExperienceSingleSelectOptions } from '@/utils/consts'
import { saveUserDetails } from '@/utils/userService'
import { getUserDetailsFromFormFields } from '@/utils/helpers'
import { UserDetails, FormFields } from '@/types/types'

type Props = {
  userDetails: UserDetails
}

export default function CrewProfileForm({ userDetails }: Props) {
  const t = useTranslations('Forms')
  const tso = useTranslations('SelectOptions')
  const professionSingleSelectOptions = getProfessionSingleSelectOptions(tso)
  const experienceSingleSelectOptions = getExperienceSingleSelectOptions(tso)

  const defaultValues = {
    ...userDetails,
    ...userDetails.profile,
    ...userDetails.currentProject,
  }

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    values: defaultValues,
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      const details = getUserDetailsFromFormFields(data)
      await saveUserDetails(details)
      // TODO: show success message
    } catch (e) {
      // TODO: show error message
    }
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
              errorMessage={t('profileForm.lastNameErrM')}
              placeholder={t('profileForm.lastName')}
            />
          </div>
        </div>
        <div className="row">
          <TextArea
            register={register}
            registerOptions={{ required: false }}
            label={t('profileForm.intro')}
            name="about"
            placeholder={t('profileForm.introPlh')}
          />
        </div>
        <div className="row">
          <div className="column">
            <SingleSelect
              register={register}
              registerOptions={{ required: true }}
              selectOptions={professionSingleSelectOptions}
              label={t('profileForm.profession')}
              name="profession"
              error={!!errors.profession}
              errorMessage={t('profileForm.professionErrM')}
            />
            <SingleSelect
              register={register}
              registerOptions={{ required: true }}
              selectOptions={experienceSingleSelectOptions}
              label={t('profileForm.experienceYears')}
              name="experienceYears"
              error={!!errors.experienceYears}
              errorMessage={t('profileForm.experienceYearsErrM')}
            />
            <TextInput
              register={register}
              registerOptions={{ required: true, valueAsNumber: true, min: 0 }}
              label={t('profileForm.hourlyRate')}
              name="hourlyRate"
              error={!!errors.hourlyRate}
              errorMessage={t('profileForm.hourlyRateErrM')}
              placeholder="10.00"
              type="number"
            />
            <TextInput
              register={register}
              registerOptions={{ required: true, pattern: /^[+]?[0-9\s-]{7,}$/ }}
              label={t('profileForm.contactNo')}
              name="contactNo"
              error={!!errors.contactNo}
              errorMessage={t('profileForm.contactNoErrM')}
              placeholder={t('profileForm.contactNoPlh')}
            />
          </div>
          <div className="column">
            <DateRangePicker
              control={control}
              registerOptions={{ required: true }}
              name="availability"
              label={t('profileForm.availability')}
              error={!!errors.availability}
              errorMessage={t('profileForm.availabilityErrM')}
            />
          </div>
        </div>
        <button type="submit" className="button submit-button">
          {t('submit')}
        </button>
      </form>
    </div>
  )
}
