import { UseFormRegister, RegisterOptions } from 'react-hook-form'
import ErrorMessage from '@/components/forms/formComponents'
import { FormFields, FormFieldKeys } from '@/types/types'

type Props = {
  register: UseFormRegister<FormFields>
  registerOptions: RegisterOptions
  selectOptions: { name: string; value: string }[]
  label: string
  name: FormFieldKeys
  error?: boolean
  errorMessage?: string
}

export default function SingleSelect({
  register,
  label,
  name,
  registerOptions,
  selectOptions,
  error = false,
  errorMessage = '',
  ...rest
}: Props) {
  const className = error ? 'error' : ''
  return (
    <div className="form-item">
      <label htmlFor={name}>{label}</label>
      <select id={name} aria-invalid={error} className={className} {...register(name, registerOptions)} {...rest}>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      <ErrorMessage show={error} message={errorMessage} />
    </div>
  )
}
