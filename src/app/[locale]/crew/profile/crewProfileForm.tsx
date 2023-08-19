'use client'

import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form'
import { useUser } from '@clerk/nextjs'
import { TextInput, TextArea, DateRangePicker, SingleSelect } from '@/components/forms'

export default function ProducerForm() {
  const t = useTranslations('Forms')
  const { user } = useUser() // need to get ALL user data if user exist, if not, use the name only, from auth probably in BE

  const professionOptions = [
    { name: '---Select one---', value: '' },
    { name: 'Cinematographer', value: 'cinematographer' },
    { name: 'Cameraman', value: 'cameraman' },
    { name: 'Film editor', value: 'film_editor' },
    { name: 'Production designer', value: 'production_designer' },
    { name: 'Set decorator', value: 'set_decorator' },
    { name: 'Costume designer', value: 'costume_designer' },
    { name: 'Makeup artist', value: 'makeup_artist' },
    { name: 'Audio engineer', value: 'audio_engineer' },
    { name: 'Sound editor', value: 'sound_editor' },
    { name: 'Stunt coordinator', value: 'stunt_coordinator' },
    { name: 'Other', value: 'other' },
  ]

  const experienceOptions = [
    { name: '---Select---', value: '' },
    { name: '0-1', value: '1' },
    { name: '1-2', value: '2' },
    { name: '2-5', value: '5' },
    { name: '5-10', value: '10' },
    { name: '10+', value: '11' },
  ]

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
              selectOptions={professionOptions}
              label="Profession"
              name="profession"
              error={!!errors.profession}
              errorMessage="Please select your profession."
            />
            <SingleSelect
              register={register}
              registerOptions={{ required: true }}
              selectOptions={experienceOptions}
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
