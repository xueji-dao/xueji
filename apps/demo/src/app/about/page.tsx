import styles from './styles.module.scss'
import { Metadata } from 'next'
import Link from 'next/link'
import { CONFIG } from '@/global-config'
import { useFormatter, useLocale, useNow, useTranslations } from 'next-intl'

import { LocaleSwitcher } from '@/lib/i18n/components'

import DayjsInfo from './DayjsInfo'

export const metadata: Metadata = { title: `About - ${CONFIG.appName}` }

type CodeProps = {
  children: React.ReactNode
}

function Code({ children }: CodeProps) {
  return <code className={styles.inlineCode}>{children}</code>
}

export default function About() {
  console.log('test log from page.tsx')
  // console.error('test error log from page.tsx')

  const t = useTranslations('AboutPage') // t('About.title');
  const format = useFormatter()
  const now = useNow()
  const locale = useLocale()
  const dateTime = new Date('2024-09-04T07:12:52.516Z')
  const items = ['HTML', 'CSS', 'JavaScript']
  return (
    <div className={styles.container}>
      <LocaleSwitcher />
      <h1 className="text-4xl font-semibold tracking-tight">{t('title')}</h1>
      <div data-test-id="1" data-custom="1a">
        <div data-custom="2">
          <h1 data-testid="3">Hello World!</h1>
        </div>
      </div>
      <div className={styles.card}>
        <h1>Path: /about</h1>
        <hr className={styles.hr} />
        <h2>{t('message', { name: 'Jane' })}</h2>
        <h2>{t('followers', { count: 1000 })}</h2>
        <h2>{t('birthday', { gender: 'male', year: 1 })}</h2>
        <h2>{t('ordered', { orderDate: dateTime })}</h2>
        <h2>
          {t.rich('guidelines', {
            guidelines: (chunks) => <Link href="/">{chunks}</Link>,
            profile: (chunks) => <Link href="/blog">{chunks}</Link>,
          })}
        </h2>
        <h2>{format.number(499.9, { style: 'currency', currency: 'USD' })}</h2>
        <h2>
          {format.dateTime(dateTime, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          })}
        </h2>
        <h2>
          {format.dateTime(dateTime, 'short')} {format.relativeTime(dateTime, now)}
        </h2>
        <h2>{format.dateTimeRange(dateTime, now, 'long')}</h2>
        <h2>{format.list(items, { type: 'disjunction' })}</h2>

        {/* dayjs 语言检测 */}
        <hr className={styles.hr} />
        <h2>
          Current Locale: <Code>{locale}</Code>
        </h2>
        <DayjsInfo dateTime={dateTime} />

        <hr className={styles.hr} />
        <p>
          The response contains a custom header <Code>X-About-Custom-Header</Code> : <Code>about_header_value</Code>.
        </p>
        <p>To check the response headers of this page, open the Network tab inside your browser inspector.</p>

        <Link href="/">&larr; Back home</Link>
      </div>
    </div>
  )
}
