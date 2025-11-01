import { NextRequest } from 'next/server'

import { clearAuthCookie } from '@/lib/auth/utils'

export async function POST(request: NextRequest) {
  try {
    // 从 cookie 获取 refresh token
    const refreshToken = request.cookies.get('refresh-token')?.value

    if (refreshToken) {
      // 调用后端让 refresh token 失效（redis 清理）
      try {
        await fetch(`${process.env.BACKEND_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${refreshToken}`,
          },
          body: JSON.stringify({ refreshToken }),
        })
      } catch (backendError) {
        console.error('Backend logout failed:', backendError)
        // 继续清除本地 cookie，不因后端错误阻断退出
      }
    }

    // 清除本地 cookie
    await clearAuthCookie()

    return Response.json({ success: true })
  } catch (error) {
    console.error('Logout error:', error)
    return Response.json({ error: 'Logout failed' }, { status: 500 })
  }
}
