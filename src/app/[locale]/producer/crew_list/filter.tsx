import { useTranslations } from 'next-intl'
import { Search, MultiSelect, TextInput, DatePicker, ClearFilterButton } from '@/components/filter'
import { experienceOptions, crewListParams, getProfessionOptions } from '@/utils/consts'

export default function FilterSection() {
  const t = useTranslations('Filter')
  const so = useTranslations('SelectOptions')
  const professionOptions = getProfessionOptions(so)

  return (
    <div>
      <Search infoText={t('searchText')} placeholderText={t('searchPlh')} />
      <div className="filter-container">
        <div className="column">
          <div className="row select-filters">
            <MultiSelect
              label={t('profession')}
              filterParam={crewListParams.profession}
              selectOptions={professionOptions}
            />
            <MultiSelect
              label={t('experience')}
              filterParam={crewListParams.experience}
              selectOptions={experienceOptions}
            />
          </div>
        </div>
        <div className="column">
          <div className="row input-filters">
            <div className="column">
              <TextInput label={t('minHRate')} filterParam={crewListParams.minRate} type="number" placeholder="0" />
              <TextInput label={t('maxHRate')} filterParam={crewListParams.maxRate} type="number" placeholder="100" />
            </div>
            <div className="column">
              <DatePicker filterParam={crewListParams.availableFrom} label={t('availableFrom')} isClearable />
              <DatePicker filterParam={crewListParams.availableTo} label={t('availableTo')} isClearable />
            </div>
          </div>
        </div>
        <div className="column clear-all-button">
          <ClearFilterButton
            buttonText={t('clearButton')}
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
    </div>
  )
}
