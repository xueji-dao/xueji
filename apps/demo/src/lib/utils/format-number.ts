import type { LocaleConfig } from '@/lib/i18n/number-format-locale'

// ----------------------------------------------------------------------

/*
 * Intl.NumberFormat Locale Codes Reference
 *
 * 完整的语言环境代码列表，用于 Intl.NumberFormat 构造函数
 * 格式：language-COUNTRY (如 'en-US', 'zh-CN')
 *
 * 常用语言环境代码：
 * - en-US: 英语（美国） - 1,234.56 / $1,234.56
 * - en-GB: 英语（英国） - 1,234.56 / £1,234.56
 * - zh-CN: 中文（中国） - 1,234.56 / ¥1,234.56
 * - zh-TW: 中文（台湾） - 1,234.56 / NT$1,234.56
 * - ja-JP: 日语（日本） - 1,234 / ¥1,234
 * - ko-KR: 韩语（韩国） - 1,234.56 / ₩1,235
 * - de-DE: 德语（德国） - 1.234,56 / 1.234,56 €
 * - fr-FR: 法语（法国） - 1 234,56 / 1 234,56 €
 * - es-ES: 西班牙语（西班牙） - 1.234,56 / 1.234,56 €
 * - pt-BR: 葡萄牙语（巴西） - 1.234,56 / R$ 1.234,56
 * - ru-RU: 俄语（俄罗斯） - 1 234,56 / 1 234,56 ₽
 * - ar-SA: 阿拉伯语（沙特） - ١٬٢٣٤٫٥٦ / ١٬٢٣٤٫٥٦ ر.س.
 *
 * 参考资料：
 * - https://gist.github.com/raushankrjha/d1c7e35cf87e69aa8b4208a8171a8416
 */

export type InputNumberValue = string | number | null | undefined

type Options = Intl.NumberFormatOptions

function processInput(inputValue: InputNumberValue): number | null {
  if (inputValue == null || Number.isNaN(inputValue)) return null
  return Number(inputValue)
}

// ----------------------------------------------------------------------

export function fNumber(inputValue: InputNumberValue, locale: LocaleConfig, options?: Options) {
  const number = processInput(inputValue)
  if (number === null) return ''

  const fm = new Intl.NumberFormat(locale.code, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number)

  return fm
}

export function fCurrency(inputValue: InputNumberValue, locale: LocaleConfig, options?: Options) {
  const number = processInput(inputValue)
  if (number === null) return ''

  const fm = new Intl.NumberFormat(locale.code, {
    style: 'currency',
    currency: locale.currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  }).format(number)

  return fm
}

export function fPercent(inputValue: InputNumberValue, locale: LocaleConfig, options?: Options) {
  const number = processInput(inputValue)
  if (number === null) return ''

  const fm = new Intl.NumberFormat(locale.code, {
    style: 'percent',
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
    ...options,
  }).format(number / 100)

  return fm
}

export function fShortenNumber(inputValue: InputNumberValue, locale: LocaleConfig, options?: Options) {
  const number = processInput(inputValue)
  if (number === null) return ''

  const fm = new Intl.NumberFormat(locale.code, {
    notation: 'compact',
    maximumFractionDigits: 2,
    ...options,
  }).format(number)

  return fm.replace(/[A-Z]/g, (match) => match.toLowerCase())
}

// ----------------------------------------------------------------------

export function fData(inputValue: InputNumberValue) {
  const number = processInput(inputValue)
  if (number === null || number === 0) return '0 bytes'

  const units = ['bytes', 'Kb', 'Mb', 'Gb', 'Tb', 'Pb', 'Eb', 'Zb', 'Yb']
  const decimal = 2
  const baseValue = 1024

  const index = Math.floor(Math.log(number) / Math.log(baseValue))
  const fm = `${parseFloat((number / baseValue ** index).toFixed(decimal))} ${units[index]}`

  return fm
}
