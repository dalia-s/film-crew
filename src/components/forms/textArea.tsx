import { UseFormRegister, RegisterOptions, FieldValues } from 'react-hook-form'
import ErrorMessage from '@/components/forms/formComponents'

type TextInputProps = {
  register: UseFormRegister<FieldValues>
  registerOptions?: RegisterOptions
  label: string
  name: string
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
}: TextInputProps) {
  const className = error ? 'error' : ''
  return (
    <div className="form-item">
      <label htmlFor={name}>{label}</label>
      <textarea
        rows={5}
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
