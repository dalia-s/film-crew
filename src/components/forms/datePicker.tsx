import { Controller, Control, RegisterOptions } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import { ErrorMessage } from '@/components/forms'
import { FormFields, FormFieldKeys } from '@/types/index'

type Props = {
  control: Control<FormFields>
  registerOptions?: RegisterOptions
  name: FormFieldKeys
  label: string
  dateFormat?: string
  error?: boolean
  errorMessage?: string
  placeholder?: string
  isClearable?: boolean
}

export default function DatePickerInput({
  control,
  name,
  label,
  registerOptions,
  error = false,
  errorMessage = '',
  dateFormat = 'yyyy-MM-dd',
  placeholder = 'YYYY-MM-DD',
  isClearable = false,
}: Props) {
  const className = error ? 'form-item error' : 'form-item'
  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        rules={registerOptions}
        render={({ field: { onChange, onBlur, value } }) => (
          <DatePicker
            id={name}
            onChange={onChange}
            onBlur={onBlur}
            selected={value as Date | null}
            dateFormat={dateFormat}
            placeholderText={placeholder}
            isClearable={isClearable}
            autoComplete="off"
          />
        )}
      />
      <ErrorMessage show={error} message={errorMessage} />
    </div>
  )
}
