'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Children } from '@/types/pageTypes'

export default function ModalWindow({ children }: Children) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return mounted ? <>{createPortal(<div className="modal-background">{children}</div>, document.body)}</> : null
}
