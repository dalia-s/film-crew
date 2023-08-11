import Image from 'next/image'
import Link from 'next/link'
import logo from '../../public/logo.png'
import smiley from '../../public/smiley.jpg'
import LanguageToggle from './languageToggle'
import { Locale } from '@/utils/i18n-config'
import getDictionary from '@/dictionaries/dictionaries'

interface HeaderProps {
  children?: React.ReactNode
  lang: Locale
}

export default function Header({ lang, children }: HeaderProps) {
  return (
    <header>
      <Link href={`/${lang}`} className="logo-link">
        <Image src={logo} alt="logo" width="30" />
        <span style={{ padding: '0.5em 0 0 0.5em' }}>FilmCrew</span>
      </Link>
      <div className="header-content">
        {children}
        <LanguageToggle />
      </div>
    </header>
  )
}

Header.defaultProps = {
  children: null,
}

export async function HomeHeader(props: HeaderProps) {
  const dict = await getDictionary(props.lang)

  return (
    <Header lang={props.lang}>
      <Link href={`/${props.lang}/crew/profile`}>{dict.header.login}</Link>
      <Link href={`/${props.lang}/producer/profile`}>{dict.header.register}</Link>
    </Header>
  )
}

export async function CrewHeader(props: HeaderProps) {
  const dict = await getDictionary(props.lang)

  return (
    <Header lang={props.lang}>
      <Link href={`/${props.lang}/crew/calendar`}>{dict.header.calendar}</Link>
      <Link href={`/${props.lang}/crew/profile`}>{dict.header.profile}</Link>
      <Link href={`/${props.lang}/crew/profile`}>
        <Image src={smiley} alt="logo" width="40" />
      </Link>
      <Link href={`/${props.lang}`}>{dict.header.logout}</Link>
    </Header>
  )
}

export async function ProducerHeader(props: HeaderProps) {
  const dict = await getDictionary(props.lang)

  return (
    <Header lang={props.lang}>
      <Link href={`/${props.lang}/producer/search`}>{dict.header.search}</Link>
      <Link href={`/${props.lang}/producer/profile`}>{dict.header.profile}</Link>
      <Link href={`/${props.lang}/producer/profile`}>
        <Image src={smiley} alt="logo" width="40" />
      </Link>
      <Link href={`/${props.lang}`}>{dict.header.logout}</Link>
    </Header>
  )
}
