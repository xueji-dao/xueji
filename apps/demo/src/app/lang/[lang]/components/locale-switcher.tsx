'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { i18n, type Locale } from '@/lib/lang/i18n-config'

export default function LocaleSwitcher() {
  const pathname = usePathname()
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return '/lang'
    const segments = pathname.split('/')
    segments[2] = locale
    return segments.join('/')
  }

  return (
    <div>
      <p>Locale switcher:</p>
      <ul>
        {i18n.locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href={redirectedPathname(locale)}>{locale}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
