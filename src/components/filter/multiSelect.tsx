import { ChangeEvent } from 'react'

type SelectProps = {
  label: string
  name: string
  selectOptions: { name: string; value: string }[]
  onChange: (e: ChangeEvent) => void
}

export default function MultiSelect({ label, name, selectOptions, onChange }: SelectProps) {
  return (
    <div className="form-item">
      <label htmlFor={name}>{label}</label>
      <select id={name} onChange={onChange} name={name} multiple>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
