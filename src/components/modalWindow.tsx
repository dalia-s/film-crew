'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

type Props = {
  children: React.ReactNode
}

export default function ModalWindow({ children }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return mounted ? <>{createPortal(<div className="modal-background">{children}</div>, document.body)}</> : null
}
