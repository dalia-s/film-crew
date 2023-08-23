'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFilterParamUpdate, useFilterState } from '@/utils/customHooks'

type Props = {
  label: string
  filterParam: string
  placeholder?: string
  type?: 'text' | 'number'
}

export default function TextInput({ label, filterParam, placeholder, type = 'text' }: Props) {
  const updateParams = useFilterParamUpdate(filterParam)
  const searchParams = useSearchParams()

  const stateInit = () => searchParams.get(filterParam) || ''
  const { value, setValue } = useFilterState<string>(filterParam, stateInit, '')

  useEffect(() => () => updateParams.cancel(), [updateParams])

  const onChange = (newValue: string) => {
    setValue(newValue)
    updateParams(newValue)
  }

  return (
    <div className="form-item">
      <label htmlFor={filterParam}>{label}</label>
      <input
        type={type}
        id={filterParam}
        name={filterParam}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        min={0}
      />
    </div>
  )
}
