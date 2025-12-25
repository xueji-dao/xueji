'use client'

import { createPaletteChannel } from 'minimal-shared/utils'

import type { ThemeOptions } from './types'

// ----------------------------------------------------------------------

// 覆盖主题配置示例，方便项目需要自定义主题时快速修改，而不需要直接修改核心主题文件
export const themeOverrides: ThemeOptions = {
  colorSchemes: {
    light: {
      palette: {
        primary: createPaletteChannel({
          lighter: '#E4DCFD',
          light: '#A996F8',
          main: '#6950E8',
          dark: '#3828A7',
          darker: '#180F6F',
          contrastText: '#FFFFFF',
        }),
      },
    },
    dark: {
      palette: {
        primary: createPaletteChannel({
          lighter: '#E4DCFD',
          light: '#A996F8',
          main: '#6950E8',
          dark: '#3828A7',
          darker: '#180F6F',
          contrastText: '#FFFFFF',
        }),
      },
    },
  },
}
