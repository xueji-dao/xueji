import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

export type ThemeMode = 'light' | 'dark' | 'system'

export const themeModeAtom = atomWithStorage<ThemeMode>('theme-mode', 'system')

// 系统主题检测
export const systemThemeAtom = atom<'light' | 'dark'>('light')

// 解析后的主题（考虑系统主题）
export const resolvedThemeAtom = atom((get) => {
  const mode = get(themeModeAtom)
  if (mode === 'system') {
    return get(systemThemeAtom)
  }
  return mode
})
