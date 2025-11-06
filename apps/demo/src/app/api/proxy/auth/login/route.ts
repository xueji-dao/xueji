import { NextResponse } from 'next/server'
import { getTranslations } from 'next-intl/server'

import { type LoginResponse } from '@/lib/api/rest/auth'

export async function POST(request: Request) {
  try {
    const credentials = await request.json()
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })
    const data: LoginResponse = await response.json()
    const t = await getTranslations('LoginPage')

    if (!response.ok) {
      return Response.json({ error: t('invalidCredentials') }, { status: response.status })
    }

    const responseObj = NextResponse.json({ accessToken: data.accessToken })

    responseObj.cookies.set('refresh-token', data.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '2592000'), // 30天
      path: '/',
    })

    return responseObj
  } catch (error) {
    console.error('Login error:', error)
    return Response.json({ error: '服务器异常' }, { status: 500 })
  }
}
