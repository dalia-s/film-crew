'use client'

import { useState, ChangeEvent, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useFilterParamUpdate } from '@/utils/customHooks'
import { crewListParams } from '@/utils/consts'

type Props = {
  infoText: string
  placeholderText: string
}

export default function Search({ infoText, placeholderText }: Props) {
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
        <input type="search" id="search" placeholder={placeholderText} onChange={onChange} value={inputValue} />
        <button type="button" onClick={onClear}>
          &#x2715;
        </button>
      </div>
      <span>{infoText}</span>
    </div>
  )
}
