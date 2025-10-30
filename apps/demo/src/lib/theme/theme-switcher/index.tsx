'use client'

import styles from './switch.module.css'
import { useAtom } from 'jotai'

import { themeModeAtom, type ThemeMode } from '@/lib/store'

const modes: ThemeMode[] = ['system', 'light', 'dark']

export function ThemeSwitcher() {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom)

  const handleToggle = () => {
    const currentIndex = modes.indexOf(themeMode)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    setThemeMode(nextMode)
  }

  return <button suppressHydrationWarning className={styles.switch} onClick={handleToggle} />
}
