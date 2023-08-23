'use client'

import { faRotate, faPersonFallingBurst } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '@/components/icon'

type Props = {
  reset: () => void
}

export default function GlobalError({ reset }: Props) {
  return (
    <html lang="en">
      <body>
        <div className="global-error-container">
          <FaIcon icon={faPersonFallingBurst} className="red" />
          <button type="button" className="button" onClick={() => reset()}>
            <FaIcon icon={faRotate} />
          </button>
        </div>
      </body>
    </html>
  )
}
