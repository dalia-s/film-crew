'use client'

import { ChangeEvent } from 'react'

// import { useTranslations } from 'next-intl'
import { Search, MultiSelect, TextInput, DatePicker } from '@/components/filter'

export default function FilterSection() {
  // const t = useTranslations('PageNames')

  const onSearchChange = (e: ChangeEvent) => {
    console.log(e)
  }

  const onFilterChange = (e: ChangeEvent) => {
    console.log(e)
  }

  const onDateChange = (date: Date | null, name: string) => {
    console.log(name)
    console.log(date)
  }

  const onClearSearch = () => {
    console.log('clearing filters')
  }

  const onClearFilters = () => {
    console.log('clearing filters')
  }

  const professionOptions = [
    { name: 'Cinematographer', value: 'cinematographer' },
    { name: 'Cameraman', value: 'cameraman' },
    { name: 'Film editor', value: 'film_editor' },
    { name: 'Production designer', value: 'production_designer' },
    { name: 'Set decorator', value: 'set_decorator' },
    { name: 'Costume designer', value: 'costume_designer' },
    { name: 'Makeup artist', value: 'makeup_artist' },
    { name: 'Audio engineer', value: 'audio_engineer' },
    { name: 'Sound editor', value: 'sound_editor' },
    { name: 'Stunt coordinator', value: 'stunt_coordinator' },
    { name: 'Other', value: 'other' },
  ]

  const experienceOptions = [
    { name: '0-1', value: '1' },
    { name: '1-2', value: '2' },
    { name: '2-5', value: '5' },
    { name: '5-10', value: '10' },
    { name: '10+', value: '11' },
  ]

  return (
    <>
      <Search
        onChange={onSearchChange}
        onClear={onClearSearch}
        infoText="You can search by the crew name or the information in the introduction."
      />
      <div className="filter-container">
        <div className="column">
          <div className="row select-filters">
            <MultiSelect
              label="Profession"
              name="profession"
              selectOptions={professionOptions}
              onChange={onFilterChange}
            />
            <MultiSelect
              label="Experience"
              name="experience"
              selectOptions={experienceOptions}
              onChange={onFilterChange}
            />
          </div>
        </div>
        <div className="column">
          <div className="row input-filters">
            <div className="column">
              <TextInput label="Minimum hourly rate" name="minHRate" onChange={onFilterChange} type="number" />
              <TextInput label="Maximum hourly rate" name="maxHRate" onChange={onFilterChange} type="number" />
            </div>
            <div className="column">
              <DatePicker
                name="availableFrom"
                label="Available from"
                value={new Date()}
                isClearable
                onChange={onDateChange}
              />
              <DatePicker
                name="availableTo"
                label="Available to"
                value={new Date()}
                isClearable
                onChange={onDateChange}
              />
            </div>
          </div>
        </div>
        <div className="column clear-all-button">
          <button type="button" className="button" onClick={onClearFilters}>
            Clear all
          </button>
        </div>
      </div>
    </>
  )
}
