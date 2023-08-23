'use client'

import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'
import ErrorMessage from '@/components/forms/formComponents'
import { getUserRedirectPath, createUser } from '@/utils/userService'
import { UserRole } from '@/types/types'

type Inputs = {
  role: UserRole
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
      await createUser(data)
      router.push(getUserRedirectPath(data.role))
    } catch (e) {
      // TODO: show error message
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="form-body account-type-form">
        <div>{t('accountForm.radioLabel')}</div>
        <div className="radio-button-block">
          <label htmlFor="crew">
            <input {...register('role', { required: true })} type="radio" value="crew" id="crew" />
            {t('accountForm.crewRadio')}
          </label>
          <label htmlFor="producer">
            <input {...register('role', { required: true })} type="radio" value="producer" id="producer" />
            {t('accountForm.producerRadio')}
          </label>
        </div>
        <ErrorMessage show={!!errors.role} message={t('accountForm.errorMessage')} />
        <button type="submit" className="button submit-button">
          {t('submit')}
        </button>
      </form>
    </div>
  )
}
