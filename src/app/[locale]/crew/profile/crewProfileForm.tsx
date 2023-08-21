'use client'

import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useUser } from '@clerk/nextjs'
import { TextInput, TextArea, DateRangePicker, SingleSelect } from '@/components/forms'
import { professionSingleSelectOptions, experienceSingleSelectOptions } from '@/utils/consts'

export default function CrewProfileForm() {
  const t = useTranslations('Forms')
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
        <div className="row">
          <TextArea
            register={register}
            registerOptions={{ required: false }}
            label="Introduce yourself"
            name="intro"
            placeholder="Tell us a little about yourself."
          />
        </div>
        <div className="row">
          <div className="column">
            <SingleSelect
              register={register}
              registerOptions={{ required: true }}
              selectOptions={professionSingleSelectOptions}
              label="Profession"
              name="profession"
              error={!!errors.profession}
              errorMessage="Please select your profession."
            />
            <SingleSelect
              register={register}
              registerOptions={{ required: true }}
              selectOptions={experienceSingleSelectOptions}
              label="Years of experience"
              name="experienceYears"
              error={!!errors.experienceYears}
              errorMessage="Please select your experience."
            />
            <TextInput
              register={register}
              registerOptions={{ required: true, valueAsNumber: true, min: 0 }}
              label="Your hourly rate (€)"
              name="hourlyRate"
              error={!!errors.hourlyRate}
              errorMessage="Please enter your hourly rate (numbers only)."
              placeholder="10.00"
              type="number"
            />
            <TextInput
              register={register}
              registerOptions={{ pattern: /^[+]?[0-9\s-]{7,}$/ }}
              label="Your contact number"
              name="contactNo"
              error={!!errors.contactNo}
              errorMessage="Please enter a valid contact number."
              placeholder="+XXX-XXX-XXXXX"
            />
          </div>
          <div className="column">
            <DateRangePicker
              control={control}
              registerOptions={{ required: true }}
              name="availability"
              label="Availability"
              error={!!errors.availability}
              errorMessage="Please select when you are next available."
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
