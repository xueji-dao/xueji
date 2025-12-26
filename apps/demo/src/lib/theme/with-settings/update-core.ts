import type { ColorSystem } from '@mui/material/styles'
import { createPaletteChannel, hexToRgbChannel } from 'minimal-shared/utils'

import type { SettingsState } from '@/components/settings'
import { setFont } from '@/styles/fonts'

import { createShadowColor } from '../core/custom-shadows'
import type { ThemeColorScheme, ThemeOptions } from '../types'
import { primaryColorPresets, secondaryColorPresets } from './color-presets'

// ----------------------------------------------------------------------

/**
 * 根据设置更新核心主题配置
 *
 * 该函数接收基础主题配置和用户设置状态，返回应用了用户偏好的完整主题配置。主要处理字体、对比度、主色调等设置的应用。
 *
 * @param theme - 默认主题设置
 * @param settingsState - 包含方向、字体、对比度和主色调的设置状态
 * @returns 应用设置后的主题
 */
export function applySettingsToTheme(theme: ThemeOptions, settingsState?: SettingsState): ThemeOptions {
  const { fontFamily, contrast = 'default', primaryColor = 'default' } = settingsState ?? {}
  const isDefaultContrast = contrast === 'default'
  const isDefaultPrimaryColor = primaryColor === 'default'

  // 获取原亮色主题的调色板
  const lightPalette = theme.colorSchemes?.light?.palette as ColorSystem['palette']

  const primaryColorPalette = createPaletteChannel(primaryColorPresets[primaryColor])
  const secondaryColorPalette = createPaletteChannel(secondaryColorPresets[primaryColor])

  /**
   * 更新指定颜色方案（亮色/暗色）的配置
   *
   * @param schemeName - 颜色方案名称（'light' 或 'dark'）
   * @returns 更新后的颜色方案配置
   */
  const updateColorScheme = (schemeName: ThemeColorScheme) => {
    const currentScheme = theme.colorSchemes?.[schemeName]

    const updatedPalette = {
      // 原有调色板配置
      ...currentScheme?.palette,
      // 如果不是默认主色调，则应用用户选择的主色调和辅助色调
      ...(!isDefaultPrimaryColor && {
        primary: primaryColorPalette,
        secondary: secondaryColorPalette,
      }),
      // 仅对亮色主题处理背景色
      ...(schemeName === 'light' && {
        background: {
          // 保留原有背景配置
          ...lightPalette?.background,
          // 如果不是默认对比度，则使用更高对比度的背景色
          ...(!isDefaultContrast && {
            default: lightPalette.grey[200], // 使用灰色200作为默认背景
            defaultChannel: hexToRgbChannel(lightPalette.grey[200]), // 转换为RGB通道格式
          }),
        },
      }),
    }

    const updatedCustomShadows = {
      // 保留原有自定义阴影配置
      ...currentScheme?.customShadows,
      // 如果不是默认主色调，则根据新的主色调创建对应的阴影
      ...(!isDefaultPrimaryColor && {
        primary: createShadowColor(primaryColorPalette.mainChannel), // 主色调阴影
        secondary: createShadowColor(secondaryColorPalette.mainChannel), // 辅助色调阴影
      }),
    }

    return {
      ...(currentScheme || {}),
      palette: updatedPalette,
      customShadows: updatedCustomShadows,
    }
  }

  return {
    // 保留原有主题配置
    ...theme,
    // 更新颜色方案配置
    colorSchemes: {
      light: updateColorScheme('light'), // 更新亮色主题
      dark: updateColorScheme('dark'), // 更新暗色主题
    },
    // 更新字体配置
    typography: {
      ...(theme.typography || {}),
      // 应用用户选择的字体族
      fontFamily: setFont(fontFamily),
    },
  }
}
