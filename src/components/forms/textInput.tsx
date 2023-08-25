import { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { ErrorMessage } from '@/components/forms'
import { FormFields, FormFieldKeys } from '@/types/types'

type Props = {
  register: UseFormRegister<FormFields>
  registerOptions: RegisterOptions
  label: string
  name: FormFieldKeys
  error?: boolean
  errorMessage?: string
  placeholder?: string
  type?: 'text' | 'number'
}

export default function TextInput({
  register,
  label,
  name,
  registerOptions,
  error = false,
  errorMessage = '',
  type = 'text',
  ...rest
}: Props) {
  const className = error ? 'error' : ''
  return (
    <div className="form-item">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        aria-invalid={error}
        className={className}
        {...register(name, registerOptions)}
        {...rest}
      />
      <ErrorMessage show={error} message={errorMessage} />
    </div>
  )
}
