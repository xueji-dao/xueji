import type { Metadata, Viewport } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'

import { SWRProvider } from '@/lib/swr-config'
import { GlobalState } from '@/components/global-state'
import { roboto } from '@/styles/fonts'

import '@/styles/global.css'
import '@/styles/style.scss'

import theme from './theme'

export const viewport: Viewport = {
  themeColor: 'black',
  initialScale: 1,
  width: 'device-width',
}

export const metadata: Metadata = {
  title: {
    template: '%s | Demo', // can be used to add a prefix or a suffix to titles defined in child route segments.
    default: 'Welcome to demo',
    // absolute: 'About', // Output: <title>About</title>
  },
  applicationName: 'Next.js',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [{ name: 'AaronZZH', url: 'https://aaronzzh.cn' }],
  description: 'The Next.js Learn Demo built with App Router.',
  // We recommend using the file-based Metadata API for icons where possible.
  // Rather than having to sync the config export with actual files,
  // the file-based API will automatically generate the correct metadata for you.
  // icons: {},
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web',
    url: 'https://nextjs.org',
    siteName: 'Next.js',
    images: [
      {
        url: 'https://nextjs.org/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    videos: [
      {
        url: 'https://nextjs.org/video.mp4', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    audio: [
      {
        url: 'https://nextjs.org/audio.mp3', // Must be an absolute URL
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale == 'en' ? 'en' : 'zh-Hans-CN'} className={roboto.variable}>
      <body>
        <NextIntlClientProvider>
          <SWRProvider>
            {/* enableCssLayer=true：生成的样式在 @layer mui 层中，CSS Modules、Tailwind CSS 或无@layer的纯CSS时，会覆盖生成的样式。 */}
            <AppRouterCacheProvider options={{ enableCssLayer: false }}>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalState>{children}</GlobalState>
              </ThemeProvider>
            </AppRouterCacheProvider>
          </SWRProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
