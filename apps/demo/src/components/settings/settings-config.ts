import { CONFIG } from '@/global-config'

import { themeConfig } from '@/lib/theme/theme-config'

import type { SettingsState } from './types'

// ----------------------------------------------------------------------

export const SETTINGS_STORAGE_KEY = 'app-settings'

export const defaultSettings: SettingsState = {
  mode: themeConfig.defaultMode,
  // direction: themeConfig.direction,
  contrast: 'default',
  navLayout: 'vertical',
  primaryColor: 'default',
  navColor: 'integrate',
  compactLayout: true,
  fontSize: 16,
  fontFamily: themeConfig.fontFamily.primary,
  version: CONFIG.appVersion,
}
