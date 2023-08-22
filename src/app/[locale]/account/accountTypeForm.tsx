'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'
import ErrorMessage from '@/components/forms/formComponents'
import { getUserRedirectPath } from '@/utils/userUtils'

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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const body = JSON.stringify(data)
      await fetch('/api/user', {
        method: 'POST',
        body,
      })
      router.push(getUserRedirectPath(data.role))
    } catch (e) {
      // console.log(e)
      // handle error
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-body account-type-form">
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
        <button type="submit" className="button primary submit-button">
          {t('submit')}
        </button>
      </form>
    </div>
  )
}
