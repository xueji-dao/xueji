import type { Metadata, Viewport } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'

import '@/lib/api/request' // 引入拦截器

import { QueryProvider } from '@/lib/api/query-provider'
import { JotaiProvider } from '@/lib/store/jotai-provider'
import { ThemeProvider, ThemeSwitcher } from '@/lib/theme'
import { GlobalState } from '@/components/global-state'
import { roboto } from '@/styles/fonts'

import '@/styles/global.css'
import '@/styles/style.scss'

import { ConditionalHeader } from '@/components/ConditionalHeader'

const APP_NAME = '学记助理'
const APP_DEFAULT_TITLE = '学记助理 - 智能学习助手'
const APP_TITLE_TEMPLATE = '%s - 学记助理'
const APP_DESCRIPTION = '智能学习与知识管理, 知识地图'

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  initialScale: 1,
  width: 'device-width',
}

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE, // can be used to add a prefix or a suffix to titles defined in child route segments.
    // absolute: 'About', // Output: <title>About</title>
  },
  description: APP_DESCRIPTION,
  keywords: ['学习助手', 'AI', '教育', '知识管理', 'Next.js', 'React'],
  authors: [{ name: 'AaronZZH', url: 'https://aaronzzh.cn' }],
  // We recommend using the file-based Metadata API for icons where possible.
  // Rather than having to sync the config export with actual files,
  // the file-based API will automatically generate the correct metadata for you.
  // icons: {},
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: APP_DEFAULT_TITLE,
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    url: 'https://xuejiai.com',
    images: [
      {
        url: 'https://xuejiai.com/og.png', // Must be an absolute URL
        width: 800,
        height: 600,
      },
      {
        url: 'https://xuejiai.com/og-alt.png', // Must be an absolute URL
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    videos: [
      {
        url: 'https://xuejiai.com/video.mp4', // Must be an absolute URL
        width: 800,
        height: 600,
      },
    ],
    audio: [
      {
        url: 'https://xuejiai.com/audio.mp3', // Must be an absolute URL
      },
    ],
    locale: 'en_US',
  },
  twitter: {
    card: 'summary',
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  return (
    <html lang={locale == 'en' ? 'en' : 'zh-Hans-CN'} className={roboto.variable}>
      <body>
        <NextIntlClientProvider>
          <QueryProvider>
            {/* enableCssLayer=true：生成的样式在 @layer mui 层中，CSS Modules、Tailwind CSS 或无@layer的纯CSS时，会覆盖生成的样式。 */}
            <AppRouterCacheProvider options={{ enableCssLayer: false }}>
              <GlobalState>
                <JotaiProvider>
                  <ThemeProvider>
                    <ConditionalHeader />
                    <ThemeSwitcher />
                    {children}
                  </ThemeProvider>
                </JotaiProvider>
              </GlobalState>
            </AppRouterCacheProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
