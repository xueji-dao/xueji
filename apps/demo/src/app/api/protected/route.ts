import { NextRequest, NextResponse } from 'next/server'

import { withAuth, withRole } from '@/lib/auth/middleware'

// 基础认证保护
export const GET = withAuth(async (request, { user }) => {
  return NextResponse.json({
    message: '这是受保护的数据',
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    timestamp: new Date().toISOString(),
  })
})

// 需要管理员角色
export const POST = withRole(['admin'], async (request, { user }) => {
  const body = await request.json()

  return NextResponse.json({
    message: '数据已保存',
    data: body,
    savedBy: user.email,
  })
})

// 需要编辑者或管理员角色
export const PUT = withRole(['user', 'admin'], async (request, { user }) => {
  const body = await request.json()

  return NextResponse.json({
    message: '数据已更新',
    data: body,
    updatedBy: user.email,
  })
})
