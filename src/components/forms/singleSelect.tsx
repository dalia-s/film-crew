import { UseFormRegister, RegisterOptions, FieldValues } from 'react-hook-form'
import ErrorMessage from '@/components/forms/formComponents'

type SelectProps = {
  register: UseFormRegister<FieldValues>
  registerOptions?: RegisterOptions
  selectOptions: { name: string; value: string }[]
  label: string
  name: string
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
}: SelectProps) {
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
