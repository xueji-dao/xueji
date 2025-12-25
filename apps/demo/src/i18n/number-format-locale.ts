import { useLocale } from 'next-intl'
import { getLocale } from 'next-intl/server'

// ----------------------------------------------------------------------

export type LocaleConfig = {
  code: string
  currency: string
}

// 共享配置逻辑
function getLocaleConfig(locale: string): LocaleConfig {
  return (
    {
      en: { code: 'en-US', currency: 'USD' },
      zh: { code: 'zh-CN', currency: 'CNY' },
    }[locale] || { code: 'en-US', currency: 'USD' }
  )
}

// 客户端组件使用
export function useFormatNumberLocale(): LocaleConfig {
  const locale = useLocale()
  return getLocaleConfig(locale)
}

// 服务端组件/API 使用
export async function formatNumberLocale(): Promise<LocaleConfig> {
  const locale = await getLocale()
  return getLocaleConfig(locale)
}
