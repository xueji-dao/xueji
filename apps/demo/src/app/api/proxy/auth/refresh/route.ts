import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    // 从 cookie 获取 refresh token
    const refreshToken = request.cookies.get('refresh-token')?.value

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 })
    }

    // 调用后端刷新 token
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVICE_BASE_URL}/api/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      signal: AbortSignal.timeout(5000), // 5秒超时
    })

    if (!response.ok) {
      return NextResponse.json({ error: 'Token refresh failed' }, { status: 401 })
    }

    const { accessToken, refreshToken: newRefreshToken } = await response.json()

    // 更新 refresh token cookie
    const responseObj = NextResponse.json({ accessToken })
    if (newRefreshToken) {
      responseObj.cookies.set('refresh-token', newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRES_IN || '2592000'), // 默认30天
        path: '/',
      })
    }

    return responseObj
  } catch (error) {
    console.error('Token refresh error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
