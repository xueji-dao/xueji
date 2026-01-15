import Form from 'next/form'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import prisma from '@/lib/prisma'

// ❌ 与 cacheComponents 不兼容，已移除
// export const dynamic = 'force-dynamic'
// 原因：此页面需要动态渲染以确保 Server Action 正常工作和表单提交处理

export default async function NewUser() {
  // 访问 headers() 自动触发动态渲染（替代 dynamic = 'force-dynamic'）
  await headers()
  async function createUser(formData: FormData) {
    'use server'

    const name = formData.get('name') as string
    const email = formData.get('email') as string

    await prisma.user.create({
      data: { name, email },
    })

    redirect('/prisma')
  }

  return (
    <div className="mx-auto mt-12 max-w-2xl rounded-lg bg-white p-6 shadow-md">
      <h1 className="mb-6 text-3xl font-bold">Create New User</h1>
      <Form action={createUser} className="space-y-6">
        <div>
          <label htmlFor="name" className="mb-2 block text-lg font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter user name ..."
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 flex items-center text-lg font-medium">
            Email
            <span className="ml-2 rounded-lg bg-gray-500 px-2 py-1 text-xs font-semibold text-white">Required</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder="Enter user email ..."
            className="w-full rounded-lg border px-4 py-2"
          />
        </div>
        <button type="submit" className="w-full rounded-lg bg-blue-500 py-3 text-white hover:bg-blue-600">
          Create User
        </button>
      </Form>
    </div>
  )
}
