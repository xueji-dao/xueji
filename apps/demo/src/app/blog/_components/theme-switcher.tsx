'use client'

import styles from './switch.module.css'
import { Suspense, useEffect, useState } from 'react'
import Script from 'next/script'

declare global {
  let updateDOM: () => void
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateDOM: any
  }
}

type ColorSchemePreference = 'system' | 'dark' | 'light'

const STORAGE_KEY = 'nextjs-blog-starter-theme'
const modes: ColorSchemePreference[] = ['system', 'dark', 'light']

/**
 * 重构NoFOUCScript - 封装为自执行函数避免全局污染
 */
const createNoFOUCScript = (storageKey: string) => {
  return `(function() {
    const STORAGE_KEY = '${storageKey}';
    const [SYSTEM, DARK, LIGHT] = ['system', 'dark', 'light']

    function modifyTransition() {
      const css = document.createElement('style');
      css.textContent = '*,*:after,*:before{transition:none !important;}';
      document.head.appendChild(css);

      return function() {
        getComputedStyle(document.body);
        setTimeout(() => document.head.removeChild(css), 1);
      };
    }

    const media = window.matchMedia('(prefers-color-scheme: dark)');
    let updateDOM = function() {
      const restoreTransitions = modifyTransition();
      const mode = localStorage.getItem(STORAGE_KEY) || SYSTEM;
      const systemMode = media.matches ? DARK : LIGHT;
      const resolvedMode = mode === SYSTEM ? systemMode : mode;
      const classList = document.documentElement.classList;

      if (resolvedMode === DARK) classList.add(DARK);
      else classList.remove(DARK);

      document.documentElement.setAttribute('data-mode', mode);
      restoreTransitions();
    };

    // 初始化执行
    updateDOM();
    media.addEventListener('change', updateDOM);

    // 暴露到全局用于多标签同步
    window.__THEME_UPDATE_DOM = updateDOM;
  })();`
}

let updateDOM: () => void

/**
 * Switch button to quickly toggle user preference.
 */
const Switch = () => {
  const [mode, setMode] = useState<ColorSchemePreference>('system')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedMode = (localStorage.getItem(STORAGE_KEY) ?? 'system') as ColorSchemePreference
    setMode(savedMode)
  }, [])

  useEffect(() => {
    if (!mounted) return
    // store global functions to local variables to avoid any interference
    updateDOM = (window as any).__THEME_UPDATE_DOM

    // Sync the tabs: 监听 storage 事件，实现多标签页间的主题同步
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        setMode(e.newValue as ColorSchemePreference)
      }
    }
    addEventListener('storage', handleStorageChange)
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(STORAGE_KEY, mode)
    updateDOM && updateDOM()
  }, [mode, mounted])

  const handleModeSwitch = () => {
    const index = modes.indexOf(mode)
    setMode(modes[(index + 1) % modes.length])
  }
  return (
    mounted && (
      <button suppressHydrationWarning className={styles.switch} onClick={handleModeSwitch} disabled={!mounted} />
    )
  )
}

/**
 * This component witch applies classes and transitions.
 */
export const ThemeSwitcher = () => {
  return (
    <>
      <Script id="theme-switcher-script">{`${createNoFOUCScript(STORAGE_KEY)}`}</Script>
      {/* 添加加载状态 */}
      <Suspense fallback={<div className={styles.switch} />}>
        <Switch />
      </Suspense>
    </>
  )
}
