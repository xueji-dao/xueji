'use client'

import { useMemo } from 'react'
import { CssBaseline } from '@mui/material'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'

import { darkTheme, lightTheme } from './config'
import { useThemeSync } from './hooks'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { resolvedTheme } = useThemeSync()

  // 创建 MUI 主题
  const muiTheme = useMemo(() => {
    const themeConfig = resolvedTheme === 'dark' ? darkTheme : lightTheme
    return createTheme(themeConfig)
  }, [resolvedTheme])

  return (
    <MuiThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
