// MUI 本地化导入
import { zhCN as zhCNCore } from '@mui/material/locale'
import type { Components, Theme } from '@mui/material/styles'
import { enUS as enUSDate, zhCN as zhCNDate } from '@mui/x-date-pickers/locales'

export type Locale = (typeof locales)[number]

export const locales = ['en', 'zh'] as const
export const defaultLocale: Locale = 'zh'

// 完整语言配置选项
export type LocaleOption = {
  value: Locale
  label: string
  countryCode: string // 用于显示国旗图标
  adapterLocale?: string // dayjs/date-fns 本地化标识
  numberFormat: {
    code: string // 数字和货币格式化 Intl.NumberFormat locale code
    currency: string // 货币代码
  }
  systemValue?: { components: Components<Theme> } // MUI 组件本地化
}

// 语言选项配置
export const localeOptions: LocaleOption[] = [
  {
    value: 'zh',
    label: '中文',
    countryCode: 'CN',
    adapterLocale: 'zh-cn',
    numberFormat: { code: 'zh-CN', currency: 'CNY' },
    systemValue: {
      components: { ...zhCNCore.components, ...zhCNDate.components },
    },
  },
  {
    value: 'en',
    label: 'English',
    countryCode: 'US',
    adapterLocale: 'en',
    numberFormat: { code: 'en-US', currency: 'USD' },
    systemValue: {
      components: { ...enUSDate.components },
    },
  },
]

// 根据 locale 获取配置
export function getCurrentLang(locale?: string): LocaleOption {
  const fallback = localeOptions.find((l) => l.value === defaultLocale) ?? localeOptions[0]
  if (!locale) return fallback
  return localeOptions.find((l) => l.value === locale) ?? fallback
}
