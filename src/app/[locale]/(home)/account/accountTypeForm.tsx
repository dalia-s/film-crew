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
    // router.push(`/crew/profile`)
    router.push(`/producer/profile`)
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-body account-type-form">
        <div className="form-item">
          <div>{t('accountForm.radioLabel')}</div>
          <div className="radio-button-block">
            <label>
              <input {...register('role', { required: true })} type="radio" value="crew" id="crew" />
              {t('accountForm.crewRadio')}
            </label>
            <label>
              <input {...register('role', { required: true })} type="radio" value="producer" id="producer" />
              {t('accountForm.producerRadio')}
            </label>
          </div>
          <ErrorMessage show={!!errors.role} message={t('accountForm.errorMessage')} />
        </div>
        <button type="submit" className="button primary submit-button">
          {t('submit')}
        </button>
      </form>
    </div>
  )
}
