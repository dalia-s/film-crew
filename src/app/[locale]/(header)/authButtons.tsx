'use client'

import { useClerk } from '@clerk/clerk-react'
import { SignInButton } from '@clerk/nextjs'
import { faArrowRightToBracket, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons'
import FaIcon from '@/components/icon'

export function MySignInButton() {
  return (
    <SignInButton mode="modal">
      <button className="button header-auth-button" type="button">
        <FaIcon icon={faArrowRightToBracket} />
      </button>
    </SignInButton>
  )
}

export function MySignOutButton() {
  const { signOut } = useClerk()

  return (
    <button className="button header-auth-button" type="button" onClick={() => signOut()}>
      <FaIcon icon={faArrowRightFromBracket} />
    </button>
  )
}
