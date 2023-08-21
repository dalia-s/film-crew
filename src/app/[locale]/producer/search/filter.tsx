// import { useTranslations } from 'next-intl'
import { Search, MultiSelect, TextInput, DatePicker, ClearFilterButton } from '@/components/filter'
import { professionOptions, experienceOptions, crewListParams } from '@/utils/consts'

export default function FilterSection() {
  return (
    <>
      <Search infoText="Search by name or info in the introduction." />
      <div className="filter-container">
        <div className="column">
          <div className="row select-filters">
            <MultiSelect label="Profession" filterParam={crewListParams.profession} selectOptions={professionOptions} />
            <MultiSelect label="Experience" filterParam={crewListParams.experience} selectOptions={experienceOptions} />
          </div>
        </div>
        <div className="column">
          <div className="row input-filters">
            <div className="column">
              <TextInput
                label="Min hourly rate (€)"
                filterParam={crewListParams.minRate}
                type="number"
                placeholder="0"
              />
              <TextInput
                label="Max hourly rate (€)"
                filterParam={crewListParams.maxRate}
                type="number"
                placeholder="100"
              />
            </div>
            <div className="column">
              <DatePicker filterParam={crewListParams.availableFrom} label="Available from" isClearable />
              <DatePicker filterParam={crewListParams.availableTo} label="Available to" isClearable />
            </div>
          </div>
        </div>
        <div className="column clear-all-button">
          <ClearFilterButton
            buttonText="Clear all"
            filters={[
              crewListParams.profession,
              crewListParams.experience,
              crewListParams.minRate,
              crewListParams.maxRate,
              crewListParams.availableFrom,
              crewListParams.availableTo,
            ]}
          />
        </div>
      </div>
    </>
  )
}
