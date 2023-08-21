import { useCallback, useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import debouce from 'lodash/debounce'
import { updateQueryParam } from '@/utils/helpers'

export function useFilterParamUpdate(filterName: string) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateRoute = useCallback(
    debouce((value: string) => {
      const newQueryString = updateQueryParam(searchParams, filterName, value)
      router.push(`${pathname}?${newQueryString}`)
    }, 500),
    [searchParams]
  )

  return updateRoute
}

export function useFilterState<T>(filterName: string, stateInit: () => T, defaultValue: T) {
  const searchParams = useSearchParams()
  const filterApplied = searchParams.get(filterName)
  const [value, setValue] = useState<T>(stateInit)

  useEffect(() => {
    if (!filterApplied) {
      setValue(defaultValue)
    }
  }, [filterApplied])

  return { value, setValue }
}
