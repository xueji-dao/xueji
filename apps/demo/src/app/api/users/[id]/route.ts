import { NextRequest, NextResponse } from 'next/server'
import { withAuth, withRole } from '@/lib/auth/middleware'

// 获取用户信息 - 需要登录
export const GET = withAuth(async (request, { user }) => {
  const { pathname } = new URL(request.url)
  const userId = pathname.split('/').pop()

  // 只能查看自己的信息，或者管理员可以查看所有
  if (user.id !== userId) {
    // 检查是否为管理员
    const isAdmin = await checkUserRole(user.id, ['admin'], request.headers.get('authorization')?.substring(7) || '')
    if (!isAdmin) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }
  }

  return NextResponse.json({
    id: userId,
    message: '用户信息',
    accessedBy: user.email,
  })
})

// 更新用户信息 - 需要管理员权限
export const PUT = withRole(['admin'], async (request, { user }) => {
  const { pathname } = new URL(request.url)
  const userId = pathname.split('/').pop()
  const body = await request.json()

  return NextResponse.json({
    message: `用户 ${userId} 信息已更新`,
    data: body,
    updatedBy: user.email,
  })
})

// 删除用户 - 需要超级管理员权限
export const DELETE = withRole(['super-admin'], async (request, { user }) => {
  const { pathname } = new URL(request.url)
  const userId = pathname.split('/').pop()

  return NextResponse.json({
    message: `用户 ${userId} 已删除`,
    deletedBy: user.email,
  })
})

// 辅助函数：检查用户角色
async function checkUserRole(userId: string, roles: string[], token: string): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.JAVA_API_BASE_URL}/api/auth/check-permission`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, requiredRoles: roles }),
    })
    
    if (!response.ok) return false
    const { hasPermission } = await response.json()
    return hasPermission
  } catch {
    return false
  }
}