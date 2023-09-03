'use client'

import { useRouter } from 'next/navigation'

type Props = {
  text: string
}

export default function BackButton({ text }: Props) {
  const router = useRouter()

  return (
    <button type="button" className="button" onClick={() => router.back()}>
      {text}
    </button>
  )
}
