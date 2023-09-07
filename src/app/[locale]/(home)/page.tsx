import { useTranslations, useLocale } from 'next-intl'

export default function Page() {
  const t = useTranslations('LandingPage')
  const locale = useLocale()

  return (
    <div className="landing-page-container">
      <h2>{t('title')}</h2>
      <h3>{t('description')}</h3>
      {locale === 'en' && (
        <>
          <p>
            This project is a coding playground to try out Next.js (App Router), Vercel, Prisma and some other table,
            form, auth libraries.
          </p>
          <p>None of the features, styling, UX, tests, etc., are complete.</p>
          <p>
            Code:{' '}
            <a href="https://github.com/dalia-s/film-crew" target="__blank">
              GitHub
            </a>
          </p>
          <p>
            Contacts:{' '}
            <a href="https://www.linkedin.com/in/dalia-saltenyte-39b4954/" target="__blank">
              LinkedIn
            </a>
          </p>
          <p>******</p>
          <h4>Currently available features:</h4>
          <ul>
            <li>
              Auth provided by{' '}
              <a href="https://clerk.com/" target="__blank">
                Clerk
              </a>
            </li>
            <li>Sign in with Google and the account will be created automatically</li>
            <li>You can delete your account (both Clerk and FilmCrew) from the profile page</li>
            <li>There are two types of accounts: Crew and Producer</li>
            <li>Crew can only fill in their profile form for now</li>
            <li>
              Producers have their profile form and can access the crew list (a table with search and filters; dummy
              data)
            </li>
          </ul>
        </>
      )}
    </div>
  )
}
