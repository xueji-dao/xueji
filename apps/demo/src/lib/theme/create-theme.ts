'use client'

import type { Components, Theme } from '@mui/material/styles'
import { createTheme as createMuiTheme } from '@mui/material/styles'

import type { SettingsState } from '@/components/settings'

import { components } from './core/components'
import { customShadows } from './core/custom-shadows'
import { mixins } from './core/mixins'
import { opacity } from './core/opacity'
import { palette } from './core/palette'
import { shadows } from './core/shadows'
import { typography } from './core/typography'
import { themeConfig } from './theme-config'
import type { ThemeOptions } from './types'
import { applySettingsToComponents, applySettingsToTheme } from './with-settings'

// ----------------------------------------------------------------------

export const baseTheme: ThemeOptions = {
  colorSchemes: {
    light: {
      palette: palette.light,
      shadows: shadows.light,
      customShadows: customShadows.light,
      opacity,
    },
    dark: {
      palette: palette.dark,
      shadows: shadows.dark,
      customShadows: customShadows.dark,
      opacity,
    },
  },
  mixins,
  components,
  typography,
  shape: { borderRadius: 8 },
  direction: themeConfig.direction,
  cssVariables: themeConfig.cssVariables,
}

// ----------------------------------------------------------------------

type CreateThemeProps = {
  settingsState?: SettingsState
  themeOverrides?: ThemeOptions
  localeComponents?: { components?: Components<Theme> }
}

export function createTheme({
  settingsState,
  themeOverrides = {},
  localeComponents = {},
}: CreateThemeProps = {}): Theme {
  // 按用户设置修改主题
  const updatedCore = settingsState ? applySettingsToTheme(baseTheme, settingsState) : baseTheme

  // 按用户设置修改组件样式
  const updatedComponents = settingsState ? applySettingsToComponents(settingsState) : {}

  // Create and return the final theme
  const theme = createMuiTheme(
    updatedCore, // 完整主题配置（ThemeOptions）
    updatedComponents, // 仅组件覆盖 { components?: Components }
    localeComponents, // 本地化组件 { components?: Components<Theme> }
    themeOverrides, // 用户自定义覆盖 （ThemeOptions）
  )

  return theme
}
