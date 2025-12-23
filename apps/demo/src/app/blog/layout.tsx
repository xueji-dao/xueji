import type { Metadata } from 'next'
import { CONFIG } from '@/global-config'
import { ViewTransitions } from 'next-view-transitions'

import { inter } from '@/lib/fonts'
import { cn } from '@/lib/utils'
import LocaleSwitcher from '@/components/LocaleSwitcher'
import ScrollYIndicator from '@/components/motion/ScrollYIndicator'

import Footer from './_components/footer'

export const metadata: Metadata = {
  title: `Blog Example with ${CONFIG.site}`,
  description: `A statically generated blog example using Next.js and ${CONFIG.appName}.`,
  openGraph: {
    images: [CONFIG.site.ogImageUrl],
  },
  metadataBase: new URL(CONFIG.site.ogImageUrl),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ViewTransitions>
      <main className={cn(inter.className, 'dark:bg-slate-900 dark:text-slate-400')}>
        <ScrollYIndicator />
        <LocaleSwitcher />
        <div className="min-h-screen">{children}</div>
        <Footer />
      </main>
    </ViewTransitions>
  )
}
