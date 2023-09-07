import { UseFormRegister, RegisterOptions } from 'react-hook-form'
import { ErrorMessage } from '@/components/forms'
import { FormFields, FormFieldKeys } from '@/types/index'

type Props = {
  register: UseFormRegister<FormFields>
  registerOptions?: RegisterOptions
  label: string
  name: FormFieldKeys
  error?: boolean
  errorMessage?: string
  placeholder?: string
}

export default function TextInput({
  register,
  label,
  name,
  registerOptions,
  error = false,
  errorMessage = '',
  ...rest
}: Props) {
  const className = error ? 'error' : ''
  return (
    <div className="form-item">
      <label htmlFor={name}>{label}</label>
      <textarea
        rows={5}
        id={name}
        aria-invalid={error}
        className={className}
        data-testid={`${name}-input`}
        {...register(name, registerOptions)}
        {...rest}
      />
      <ErrorMessage show={error} message={errorMessage} testId={`${name}-error`} />
    </div>
  )
}
