import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { verifyToken } from '@/lib/auth/utils/server'
import { i18n } from '@/lib/lang/i18n-config'

/**
 * 解析 Accept-Language 字符串为优先级排序的语言数组
 */
function parseAcceptLanguage(input: string): string[] {
  if (!input) return []

  return input
    .split(',')
    .map((part) => {
      const [lang, q = 'q=1'] = part.trim().split(';')
      const quality = parseFloat(q.slice(2)) || 1
      return { lang, quality }
    })
    .sort((a, b) => b.quality - a.quality)
    .map((item) => item.lang)
}

function getLocale(request: NextRequest): string | undefined {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-expect-error
  const locales: string[] = i18n.locales
  const acceptLanguage = request.headers.get('accept-language') || ''
  const userLocales = parseAcceptLanguage(acceptLanguage)
  // 尝试精确匹配
  for (const lang of userLocales) {
    if (locales.includes(lang)) {
      return lang
    }
  }
  return i18n.defaultLocale
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  console.log(pathname)
  // 1. API 路由认证检查
  if (pathname.startsWith('/api/') && !pathname.startsWith('/api/proxy/') && !pathname.startsWith('/api/public/')) {
    return checkApiAuth(request)
  }

  // 2. 国际化处理
  if (!pathname.includes('lang')) return

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/lang/${locale}/`) && pathname !== `/lang/${locale}`,
  )

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)

    // e.g. incoming request is /products The new URL is now /en-US/products
    return NextResponse.redirect(new URL(`/lang/${locale}/${pathname}`, request.url))
  }
  return
}

// Nextjs API 认证检查
async function checkApiAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) {
    console.log('Invalid token:')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const token = authHeader.substring(7)
  const user = await verifyToken(token)
  if (!user) {
    console.log('Invalid token:', token)
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
  }

  // 认证通过，继续处理请求
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
