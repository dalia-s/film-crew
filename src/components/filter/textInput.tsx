import { ChangeEvent } from 'react'

type TextInputProps = {
  label: string
  name: string
  placeholder?: string
  type?: 'text' | 'number'
  onChange: (e: ChangeEvent) => void
}

export default function TextInput({ label, name, placeholder, onChange, type = 'text' }: TextInputProps) {
  return (
    <div className="form-item">
      <label htmlFor={name}>{label}</label>
      <input type={type} id={name} placeholder={placeholder} onChange={onChange} />
    </div>
  )
}
