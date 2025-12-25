'use client'

import styles from './switch.module.css'
import { useColorScheme } from '@mui/material/styles'
import { useAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils'

import { themeModeAtom, type ThemeMode } from '@/lib/store'

const modes: ThemeMode[] = ['system', 'light', 'dark']

interface ThemeSwitcherProps {
  initialTheme?: ThemeMode
}

export function ThemeSwitcher({ initialTheme = 'system' }: ThemeSwitcherProps) {
  // 使用 useHydrateAtoms 初始化主题状态, 在客户端执行支持 ssr， useHydrateAtoms 将服务端的初始状态注入到客户端 atom 中
  useHydrateAtoms([[themeModeAtom, initialTheme]])
  // const settings = useSettingsContext() // 当前 app 设置使用了 react context 需要同步设置
  // settings.setState({ mode: nextMode === 'dark' ? 'dark' : 'light' }) // setMode(nextMode) 会自动同步
  const [themeMode, setThemeMode] = useAtom(themeModeAtom)

  const { setMode } = useColorScheme()

  const handleToggle = () => {
    const currentIndex = modes.indexOf(themeMode)
    const nextMode = modes[(currentIndex + 1) % modes.length]
    setThemeMode(nextMode)
    setMode(nextMode)
  }

  return <button suppressHydrationWarning className={styles.switch} onClick={handleToggle} />
}
