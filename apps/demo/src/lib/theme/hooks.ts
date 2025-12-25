'use client'

import { useEffect, useMemo } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'

// 当前有两次实现了主题存储 //TODO jotai + react context
import {
  resolvedThemeAtom, // 最终生效的主题 ('light' | 'dark') - 当 themeMode='system' 时等于 systemTheme，否则等于 themeMode
  systemThemeAtom, // 系统主题偏好 ('light' | 'dark') - 从 prefers-color-scheme 媒体查询获取
  themeModeAtom, // 用户选择的主题模式 ('light' | 'dark' | 'system') - 用户在设置中选择的偏好
} from '@/lib/store'

/**
 * 同步主题到 DOM
 */
export function useThemeSync() {
  const resolvedTheme = useAtomValue(resolvedThemeAtom) // 实际应用的主题，用于 DOM 同步
  const themeMode = useAtomValue(themeModeAtom) // 用户选择的模式，用于 UI 显示
  const setSystemTheme = useSetAtom(systemThemeAtom) // 更新系统主题的函数

  // 监听系统主题变化
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const updateSystemTheme = () => {
      setSystemTheme(mediaQuery.matches ? 'dark' : 'light')
    }

    // 初始化系统主题
    updateSystemTheme()

    // 监听系统主题变化
    mediaQuery.addEventListener('change', updateSystemTheme)

    return () => mediaQuery.removeEventListener('change', updateSystemTheme)
  }, [setSystemTheme])

  // 同步主题亮暗模式到 DOM
  useEffect(() => {
    const root = document.documentElement

    // 同步 Tailwind dark 类，控制 html 是否 有 dark
    root.classList.toggle('dark', resolvedTheme === 'dark')

    // 设置 data-mode 属性，ThemeSwitcher 组件样式切换用
    root.setAttribute('data-mode', themeMode)

    root.style.setProperty('--theme-mode', themeMode)
    root.style.setProperty('--resolved-theme', resolvedTheme)
  }, [resolvedTheme, themeMode])

  return { resolvedTheme, themeMode }
}

/**
 * 获取主题相关的计算值
 */
export function useThemeValues() {
  const resolvedTheme = useAtomValue(resolvedThemeAtom)

  return useMemo(
    () => ({
      isDark: resolvedTheme === 'dark',
      isLight: resolvedTheme === 'light',
      resolvedTheme,
    }),
    [resolvedTheme],
  )
}
