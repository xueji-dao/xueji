'use client'

import { useEffect, useMemo } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import type { ThemeProviderProps as MuiThemeProviderProps, Theme } from '@mui/material/styles'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { useLocale } from 'next-intl'

import { getCurrentLang } from '@/lib/i18n'
import { useSettingsContext } from '@/components/settings'

import { createTheme } from './create-theme'
import { useThemeSync } from './hooks'
import { ThemeOptions } from './types'

export type ThemeProviderProps = Partial<MuiThemeProviderProps<Theme>> & {
  themeOverrides?: ThemeOptions
}

export function ThemeProvider({ themeOverrides, children, ...other }: ThemeProviderProps) {
  const settings = useSettingsContext()
  useThemeSync()
  // 有警告：https://github.com/amannn/next-intl/issues/2068
  const locale = useLocale()

  const muiTheme = useMemo(() => {
    const currentLang = getCurrentLang(locale)
    return createTheme({
      settingsState: settings.state,
      localeComponents: currentLang?.systemValue,
      themeOverrides,
    })
  }, [locale, themeOverrides, settings])

  return (
    <MuiThemeProvider disableTransitionOnChange theme={muiTheme} {...other}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
