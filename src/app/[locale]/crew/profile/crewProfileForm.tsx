'use client'

import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useUser } from '@clerk/nextjs'
import { TextInput, TextArea, DateRangePicker, SingleSelect } from '@/components/forms'
import { getProfessionSingleSelectOptions, getExperienceSingleSelectOptions } from '@/utils/consts'

export default function CrewProfileForm() {
  const t = useTranslations('Forms')
  const tso = useTranslations('SelectOptions')
  const professionSingleSelectOptions = getProfessionSingleSelectOptions(tso)
  const experienceSingleSelectOptions = getExperienceSingleSelectOptions(tso)

  const { user } = useUser() // need to get ALL user data if user exist, if not, use the name only, from auth probably in BE

  const defaultValues = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    intro: '',
    profession: '',
    hourlyRate: null,
    experienceYears: '',
    availability: [],
    contactNo: '',
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
        <div className="row">
          <TextArea
            register={register}
            registerOptions={{ required: false }}
            label={t('profileForm.intro')}
            name="intro"
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
              registerOptions={{ pattern: /^[+]?[0-9\s-]{7,}$/ }}
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
        <button type="submit" className="button primary submit-button">
          {t('submit')}
        </button>
      </form>
    </div>
  )
}
