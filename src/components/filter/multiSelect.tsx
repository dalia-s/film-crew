'use client'

import { ChangeEvent, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFilterParamUpdate, useFilterState } from '@/utils/customHooks'

type SelectProps = {
  label: string
  filterParam: string
  selectOptions: { name: string; value: string }[]
}

export default function MultiSelect({ label, filterParam, selectOptions }: SelectProps) {
  const updateParams = useFilterParamUpdate(filterParam)
  const searchParams = useSearchParams()

  const stateInit = () => searchParams.get(filterParam)?.split(',') || []
  const { value, setValue } = useFilterState<string[]>(filterParam, stateInit, [])

  useEffect(() => () => updateParams.cancel(), [updateParams])

  const onChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
    setValue(selectedValues)
    updateParams(selectedValues.join(','))
  }

  return (
    <div className="form-item">
      <label htmlFor={filterParam}>{label}</label>
      <select id={filterParam} onChange={onChange} name={filterParam} value={value} multiple>
        {selectOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}
