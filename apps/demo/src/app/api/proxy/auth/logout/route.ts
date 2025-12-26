import { NextRequest } from 'next/server'

import { clearAuthCookie } from '@/lib/auth/utils/server'

export async function POST(request: NextRequest) {
  // 从 cookie 获取 refresh token
  const refreshToken = request.cookies.get('refresh-token')?.value
  let backendSuccess = true

  if (refreshToken) {
    // 调用后端让 refresh token 失效（redis 清理）
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
        signal: AbortSignal.timeout(5000), // 5秒超时
      })
    } catch (backendError) {
      console.error('Backend logout failed:', backendError)
      backendSuccess = false
    }
  }

  // 继续清除本地 cookie，不因后端错误阻断退出
  await clearAuthCookie()
  return Response.json({
    success: true,
    backendSuccess,
  })
}
