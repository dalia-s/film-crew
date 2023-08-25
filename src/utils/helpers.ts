import { ReadonlyURLSearchParams } from 'next/navigation'
import { pageSearchParams } from './consts'

export function updateQueryParam(searchParams: ReadonlyURLSearchParams, name: string, value: string): string {
  const params = new URLSearchParams(Array.from(searchParams.entries()))
  if (value) {
    params.set(name, value)
  } else {
    params.delete(name)
  }
  // temp workaround for searchParams caching issue https://github.com/vercel/next.js/pull/47312
  const randomString = Math.random().toString()
  params.set(pageSearchParams.helper, randomString)

  return params.toString()
}
