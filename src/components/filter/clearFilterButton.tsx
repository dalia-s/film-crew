'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'

type Props = {
  buttonText: string
  filters: string[]
}

export default function ClearFilterButton({ buttonText, filters }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const onClearFilters = () => {
    const params = new URLSearchParams(Array.from(searchParams.entries()))
    if (params.size === 0) return
    filters.forEach((filter) => params.delete(filter))
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <button type="button" className="button" onClick={onClearFilters}>
      {buttonText}
    </button>
  )
}
