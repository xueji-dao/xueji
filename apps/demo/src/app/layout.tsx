import type { Metadata, Viewport } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale } from 'next-intl/server'

import '@/lib/api/request' // 引入拦截器

import { QueryProvider } from '@/lib/api/query-provider'
import { LocalizationProvider } from '@/lib/i18n/localization-provider'
import { JotaiProvider } from '@/lib/store/jotai-provider'
import { themeConfig, ThemeProvider, ThemeSwitcher } from '@/lib/theme'
import { UIProvider } from '@/components/UIProvider'
import { geistMono, geistSans, montserrat, notoSansSC } from '@/styles/fonts'

import '@/styles/global.css'
import '@/styles/style.scss'

import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'

import { AuthProvider } from '@/lib/auth/components'
import { MotionLazy } from '@/components/animate/motion-lazy'
import { ConditionalHeader } from '@/components/ConditionalHeader'
import { ProgressBar } from '@/components/progress-bar'
import { defaultSettings, SettingsDrawer, SettingsProvider } from '@/components/settings'
import { detectSettings } from '@/components/settings/server'

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
  // https://github.com/amannn/next-intl/issues/2068
  const locale = await getLocale()
  const settings = await detectSettings()
  console.log('App Settings:', settings, themeConfig.defaultMode)

  return (
    <html
      lang={locale == 'en' ? 'en' : 'zh-Hans-CN'}
      dir="ltr"
      className={`${notoSansSC.variable} ${montserrat.variable} ${geistSans.variable} ${geistMono.variable}`}
      // InitColorSchemeScript 导致水合不匹配警告
      suppressHydrationWarning>
      <body>
        <InitColorSchemeScript
          modeStorageKey={themeConfig.modeStorageKey}
          attribute={themeConfig.cssVariables.colorSchemeSelector}
          defaultMode={themeConfig.defaultMode}
        />
        <NextIntlClientProvider>
          <QueryProvider>
            {/*
              enableCssLayer=true：
              将 MUI 样式包装在 @layer mui 中，使其优先级最低。
              这样可以轻松用 Tailwind CSS、纯 CSS 等其他样式方案覆盖 MUI 样式。

              实际效果：
              @layer mui {
                .MuiButton-root { color: blue; padding: 8px; }
              }

              // Tailwind 可以轻松覆盖
              <Button className="text-red-500 p-4"> // ✅ 红色文字，16px 内边距

              // 自定义 CSS 也可以覆盖
              .custom-button { color: green; } // ✅ 绿色文字

              适用场景：需要频繁自定义 MUI 组件样式的项目
            */}
            <LocalizationProvider>
              <AuthProvider>
                <SettingsProvider defaultSettings={defaultSettings} cookieSettings={settings}>
                  <AppRouterCacheProvider options={{ enableCssLayer: true, key: 'mui-css' }}>
                    <UIProvider>
                      <JotaiProvider>
                        <ThemeProvider
                          modeStorageKey={themeConfig.modeStorageKey}
                          defaultMode={themeConfig.defaultMode}>
                          {/* 懒加载 Framer Motion 功能以减少初始包大小 */}
                          <MotionLazy>
                            <ConditionalHeader />
                            <ThemeSwitcher initialTheme={settings.mode} />
                            <ProgressBar />
                            <SettingsDrawer defaultSettings={defaultSettings} />
                            {children}
                          </MotionLazy>
                        </ThemeProvider>
                      </JotaiProvider>
                    </UIProvider>
                  </AppRouterCacheProvider>
                </SettingsProvider>
              </AuthProvider>
            </LocalizationProvider>
          </QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
