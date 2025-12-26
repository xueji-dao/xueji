'use server'

import { cookies, headers } from 'next/headers'
import acceptLanguage from 'accept-language'

import { defaultLocale, Locale, locales } from '@/lib/i18n/config'

/**
 * 用户语言偏好管理
 *
 * 通过 Cookie 存储用户选择的语言，支持服务端渲染时获取语言设置。
 * 也可以从数据库、后端服务或其他数据源读取语言偏好。
 */
const COOKIE_NAME = 'NEXT_LOCALE'

// 配置 accept-language 支持的语言
acceptLanguage.languages([...locales])

/**
 * 检测用户语言偏好
 * 优先级：Cookie > Accept-Language 头 > 默认语言
 * @returns 检测到的语言
 */
export async function detectLanguage(): Promise<Locale> {
  const cookieStore = await cookies()
  const headerStore = await headers()

  // 1. 尝试从 Cookie 获取
  const cookieLang = cookieStore.get(COOKIE_NAME)?.value
  console.log('cookieLang', cookieLang)
  const fromCookie = cookieLang && acceptLanguage.get(cookieLang)
  console.log('fromCookie', fromCookie)

  // 2. 尝试从 Accept-Language 头获取
  const headerLang = headerStore.get('accept-language') ?? undefined
  const fromHeader = headerLang && acceptLanguage.get(headerLang)

  // 3. 返回最佳匹配或默认语言
  return (fromCookie || fromHeader || defaultLocale) as Locale
}

/**
 * 获取用户当前语言设置
 * @returns 用户选择的语言或检测到的语言
 */
export async function getUserLocale(): Promise<Locale> {
  return await detectLanguage()
}

/**
 * 设置用户语言偏好
 * @param locale 要设置的语言
 */
export async function setUserLocale(locale: Locale): Promise<void> {
  ;(await cookies()).set(COOKIE_NAME, locale)
}
