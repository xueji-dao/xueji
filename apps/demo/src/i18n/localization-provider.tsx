'use client'

import 'dayjs/locale/en'
import 'dayjs/locale/zh-cn'

import { useEffect, useState } from 'react'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'

import { getCurrentLang } from './config'
import { getUserLocale } from './locale'

type Props = {
  children: React.ReactNode
}

export function LocalizationProvider({ children }: Props) {
  const [currentLang, setCurrentLang] = useState(() => getCurrentLang('zh'))

  useEffect(() => {
    getUserLocale().then((locale) => {
      const lang = getCurrentLang(locale)
      setCurrentLang(lang)
      dayjs.locale(lang.adapterLocale)
    })
  }, [])

  return (
    <MuiLocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={currentLang.adapterLocale}>
      {children}
    </MuiLocalizationProvider>
  )
}
