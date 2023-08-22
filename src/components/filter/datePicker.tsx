'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import DatePicker from 'react-datepicker'
import { updateQueryParam } from '@/utils/helpers'
import { useFilterState } from '@/utils/customHooks'

type DatePickerProps = {
  label: string
  filterParam: string
  dateFormat?: string
  placeholder?: string
  isClearable?: boolean
}

export default function DatePickerInput({
  filterParam,
  label,
  dateFormat = 'yyyy-MM-dd',
  placeholder = 'YYYY-MM-DD',
  isClearable = false,
}: DatePickerProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const stateInit = () => {
    const paramsDate = searchParams.get(filterParam)
    return paramsDate ? new Date(paramsDate) : null
  }
  const { value, setValue } = useFilterState<Date | null>(filterParam, stateInit, null)

  const updateRoute = (newValue: string) => {
    const newQueryString = updateQueryParam(searchParams, filterParam, newValue)
    router.push(`${pathname}?${newQueryString}`)
  }

  const onChange = (newDate: Date | null) => {
    setValue(newDate)
    updateRoute(newDate?.toLocaleDateString('lt') || '')
  }

  return (
    <div className="form-item">
      <label htmlFor={filterParam}>{label}</label>
      <DatePicker
        id={filterParam}
        onChange={onChange}
        selected={value}
        dateFormat={dateFormat}
        placeholderText={placeholder}
        isClearable={isClearable}
        autoComplete="off"
      />
    </div>
  )
}
