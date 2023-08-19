import DatePicker from 'react-datepicker'

type DatePickerProps = {
  name: string
  label: string
  value: Date
  dateFormat?: string
  placeholder?: string
  isClearable?: boolean
  onChange: (date: Date | null, name: string) => void
}

export default function DatePickerInput({
  name,
  label,
  value,
  dateFormat = 'yyyy-MM-dd',
  placeholder = 'YYYY-MM-DD',
  isClearable = false,
  onChange,
}: DatePickerProps) {
  return (
    <div className="form-item">
      <label htmlFor={name}>{label}</label>
      <DatePicker
        id={name}
        onChange={(v) => onChange(v, name)}
        selected={value}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        isClearable={isClearable}
      />
    </div>
  )
}
