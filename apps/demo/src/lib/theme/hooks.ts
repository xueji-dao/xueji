'use client'

import { useEffect, useMemo } from 'react'
import { useAtomValue, useSetAtom } from 'jotai'

import { resolvedThemeAtom, systemThemeAtom, themeModeAtom } from '@/lib/store'

/**
 * 同步主题到 DOM
 */
export function useThemeSync() {
  const resolvedTheme = useAtomValue(resolvedThemeAtom)
  const themeMode = useAtomValue(themeModeAtom)
  const setSystemTheme = useSetAtom(systemThemeAtom)

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

  // 同步主题到 DOM
  useEffect(() => {
    const root = document.documentElement

    // 同步 Tailwind dark 类
    root.classList.toggle('dark', resolvedTheme === 'dark')

    // 设置 data-mode 属性
    root.setAttribute('data-mode', themeMode)

    // 设置 CSS 变量用于自定义样式
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
