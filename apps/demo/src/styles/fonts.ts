import { Geist, Geist_Mono, Inter, Lusitana, Merriweather, Montserrat, Noto_Sans_SC, Roboto } from 'next/font/google'

export const lusitana = Lusitana({
  weight: ['400', '700'],
  subsets: ['latin'],
})

export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// 现代中英文主字体 - 界面和正文
export const notoSansSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-noto-sans-sc',
  display: 'swap',
})

// 现代英文字体 - 与中文搭配良好
export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
  style: ['normal'],
})

// 标题字体 - 几何现代感
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

export const serif = Merriweather({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  style: ['normal', 'italic'],
})

export const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  style: ['normal', 'italic'],
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
})

export function setFont(fontName?: string): string {
  const baseFonts = [
    'system-ui',
    '-apple-system',
    '"Microsoft YaHei"', // 中文微软雅黑优先
    '"Segoe UI"',
    'Roboto',
    '"PingFang SC"', // macOS 备选
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
  ]

  return fontName ? `${fontName}, ${baseFonts.join(', ')}` : baseFonts.join(', ')
}

// 推荐配置：结合 Web 字体和系统字体的最佳实践
export const chineseFriendlyConfig = {
  // 英文 Geist 优先，中文微软雅黑优先：最佳混合方案
  mixed: setFont('var(--font-geist-sans), "Microsoft YaHei"'),
  // Web 字体优先：最佳视觉效果
  webFirst: setFont('var(--font-noto-sans-sc), "Microsoft YaHei"'),
  // 系统字体优先：最佳性能
  systemFirst: setFont('"Microsoft YaHei", "PingFang SC"'),
  // 英文字体：现代简洁
  english: setFont('var(--font-geist-sans)'),
  // 代码字体：等宽专用
  mono: setFont('var(--font-geist-mono)'),
  // 标题字体：装饰性
  display: setFont('var(--font-montserrat), "Microsoft YaHei"'),
}

export const optimizedFontConfig = {
  // 使用 CSS 变量的 Web 字体配置
  webFont: setFont('var(--font-noto-sans-sc)'),
  geist: setFont('var(--font-geist-sans)'),
  mono: setFont('var(--font-geist-mono)'),
  display: setFont('var(--font-montserrat)'),

  // 推荐的混合配置
  primary: chineseFriendlyConfig.mixed, // 英文 Geist + 中文微软雅黑（推荐）
  webFirst: chineseFriendlyConfig.webFirst, // Web 字体优先
  performance: chineseFriendlyConfig.systemFirst, // 性能优先
  system: setFont(), // 纯系统字体
}
