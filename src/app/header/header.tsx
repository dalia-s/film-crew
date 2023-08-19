import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import logo from '../../../public/logo.png'
import LanguageToggle from './languageToggle'
import { MySignInButton, MySignOutButton } from './authButtons'
import { ProducerLinks, CrewLinks } from './roleSpecificLinks'
import { getUserRole, userRole } from '@/utils/helpers'

export default async function Header() {
  const locale = useLocale()
  const role = await getUserRole()

  return (
    <header>
      <Link href="/" className="logo-link">
        <Image src={logo} alt="logo" width="30" />
        <span>FilmCrew</span>
      </Link>
      <div className="header-content">
        <SignedOut>
          <MySignInButton />
        </SignedOut>
        <SignedIn>
          {role === userRole.crew && <CrewLinks />}
          {role === userRole.producer && <ProducerLinks />}
          <MySignOutButton />
        </SignedIn>
        <LanguageToggle locale={locale} />
      </div>
    </header>
  )
}
