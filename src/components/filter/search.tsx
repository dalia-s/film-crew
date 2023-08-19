import { ChangeEvent } from 'react'

type SearchProps = {
  onChange: (e: ChangeEvent) => void
  onClear: () => void
  infoText: string
}

export default function Search({ infoText, onChange, onClear }: SearchProps) {
  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input type="search" placeholder="Search..." onChange={onChange} />
        <button type="button" onClick={onClear}>
          &#x2715;
        </button>
      </div>
      <span>{infoText}</span>
    </div>
  )
}
