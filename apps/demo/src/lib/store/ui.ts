import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

// UI 相关状态
export const sidebarOpenAtom = atom(false)
export const modalOpenAtom = atom(false)
export const loadingAtom = atom(false)

// 用户偏好设置
export const languageAtom = atomWithStorage<'zh' | 'en'>('language', 'zh')
export const compactModeAtom = atomWithStorage('compact-mode', false)