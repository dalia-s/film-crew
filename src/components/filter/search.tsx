'use client'

import { useState, ChangeEvent, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFilterParamUpdate } from '@/utils/customHooks'
import { crewListParams } from '@/utils/consts'

type SearchProps = {
  infoText: string
}

export default function Search({ infoText }: SearchProps) {
  const updateParams = useFilterParamUpdate(crewListParams.search)
  const searchParams = useSearchParams()

  const stateInit = () => searchParams.get(crewListParams.search) || ''
  const [inputValue, setInputValue] = useState<string>(stateInit)

  useEffect(() => () => updateParams.cancel(), [updateParams])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setInputValue(value)
    updateParams(value)
  }

  const onClear = () => {
    setInputValue('')
    updateParams('')
  }

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input type="search" placeholder="Search..." onChange={onChange} value={inputValue} />
        <button type="button" onClick={onClear}>
          &#x2715;
        </button>
      </div>
      <span>{infoText}</span>
    </div>
  )
}
