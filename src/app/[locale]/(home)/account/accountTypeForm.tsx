'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'
import ErrorMessage from '@/components/forms/formComponents'

type Inputs = {
  role: string
}

export default function AccountTypeForm() {
  const t = useTranslations('Forms')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
    // save data (create metadata) and depending on the selection redirect to appropriate profile page
    // router.push(`/${loc}/crew/profile`)
    router.push(`/producer/profile`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-body account-type-form">
        <div className="form-item">
          <div>Please set your account type:</div>
          <div className="radio-button-block">
            <label>
              <input {...register('role', { required: true })} type="radio" value="crew" id="crew" />
              Crew
            </label>
            <label>
              <input {...register('role', { required: true })} type="radio" value="producer" id="producer" />
              Producer
            </label>
          </div>
          <ErrorMessage show={!!errors.role} message="Please select one of the options." />
        </div>
        <button type="submit" className="button primary submit-button">
          {t('submit')}
        </button>
      </form>
    </div>
  )
}
