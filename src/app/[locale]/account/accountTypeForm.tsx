'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useForm, SubmitHandler } from 'react-hook-form'
import { ErrorMessage, SubmitButton } from '@/components/forms'
import { getUserRedirectPath, createUser } from '@/utils/userService'
import { UserRole } from '@/types/index'

type Inputs = {
  role: UserRole
}

export default function AccountTypeForm() {
  const [saving, setSaving] = useState(false)
  const t = useTranslations('Forms')
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      setSaving(true)
      await createUser(data)
      router.refresh()
      router.replace(getUserRedirectPath(data.role))
    } catch (e) {
      // TODO: show error message
    } finally {
      setSaving(false)
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
        <SubmitButton text={t('submit')} saving={saving} />
      </form>
    </div>
  )
}
