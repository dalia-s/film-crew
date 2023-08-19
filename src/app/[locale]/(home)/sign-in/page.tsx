'use client'

import { SignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  return (
    <div className="sign-in-container">
      <SignIn />
    </div>
  )
}
