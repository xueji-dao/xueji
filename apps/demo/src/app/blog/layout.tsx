import './blog-styles.css'

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

// import { ViewTransitions } from 'next-view-transitions'

import { CMS_NAME, HOME_OG_IMAGE_URL } from '@/lib/constants'
import { cn } from '@/lib/utils'

import Footer from './_components/footer'

// import { sans } from '@/lib/fonts'

// import { ThemeSwitcher } from './_components/theme-switcher'
// import LocaleSwitcher from '@/components/LocaleSwitcher'
// import ScrollYIndicator from '@/components/motion/ScrollYIndicator'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: `Blog Example with ${CMS_NAME}`,
  description: `A statically generated blog example using Next.js and ${CMS_NAME}.`,
  openGraph: {
    images: [HOME_OG_IMAGE_URL],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <main className={cn(inter.className, 'dark:bg-slate-900 dark:text-slate-400')}>
      {/* <ScrollYIndicator />
        <ThemeSwitcher />
        <LocaleSwitcher /> */}
      <div className="">{children}</div>
      <Footer />
    </main>
  )
}
