import { useState } from 'react'

import { Controller, Control, RegisterOptions } from 'react-hook-form'
import DatePicker from 'react-datepicker'
import ErrorMessage from '@/components/forms/formComponents'

type DatePickerProps = {
  control: Control
  registerOptions?: RegisterOptions
  name: string
  label: string
  error?: boolean
  errorMessage?: string
}

export default function DateRangePicker({
  control,
  name,
  label,
  registerOptions,
  error = false,
  errorMessage = '',
}: DatePickerProps) {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [startDate, endDate] = dateRange
  const className = error ? 'form-item center error' : 'form-item center'

  return (
    <div className={className}>
      <label htmlFor={name}>{label}</label>
      <Controller
        control={control}
        name={name}
        rules={registerOptions}
        render={({ field: { onChange } }) => (
          <DatePicker
            onChange={(e) => {
              setDateRange(e)
              onChange(e)
            }}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
          />
        )}
      />
      <ErrorMessage show={error} message={errorMessage} />
    </div>
  )
}
