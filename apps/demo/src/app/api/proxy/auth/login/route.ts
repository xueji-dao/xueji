import { NextResponse } from 'next/server'

import { authenticateUser } from '@/lib/auth/server'

export async function POST(request: Request) {
  try {
    const credentials = await request.json()
    const { accessToken, refreshToken } = await authenticateUser(credentials)

    const responseObj = NextResponse.json({
      ok: true,
      accessToken,
    })

    // 设置 refresh token cookie
    responseObj.cookies.set('refresh-token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '2592000'), // 30天
      path: '/',
    })

    return responseObj
  } catch (error) {
    console.error('Login error:', error)
    const status = error instanceof Error && error.message === 'Invalid credentials' ? 401 : 500
    const message =
      error instanceof Error && error.message === 'Invalid credentials' ? 'Invalid credentials' : 'Login failed'
    return Response.json({ error: message }, { status })
  }
}
