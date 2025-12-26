'use client'

import Link from 'next/link'

import type { Person } from '@/types/person'
import { PersonApi } from '@/lib/api'
import { AppErrorBoundary } from '@/components/ErrorBoundary'

import { DedupeManualTest } from './_components/DedupeManualTest'
import { DedupeTest } from './_components/DedupeTest'
import { ErrorTestComponent } from './_components/ErrorTestComponent'

type PersonProps = {
  person: Person
}

// 若要减小客户端 JavaScript 包的大小，请在特定的交互式组件中添加 'use client'，而不是将大型 UI 部分标记为客户端组件。
// 使用属性将数据从服务器组件传递到客户端组件。
// 使用 React 的“use”来将数据从服务器传输至客户端。首先服务器组件中获取数据，并将该 Promise 作为属性传递给客户端组件

// use 示例：
// # 服务端组件
// export default async function Page() {
//   const user = fetchUser() // 不 await，传递 Promise
//   return (
//     <Suspense fallback={<Loading />}>
//       <UserProfile user={user} />
//     </Suspense>
//   )
// }

// # 客户端组件
// 'use client'
// import { use } from 'react'
// function UserProfile({ user }: { user: Promise<User> }) {
//   const userInfo = use(user) // 在客户端解析 Promise
//   return <div>{userInfo.name}</div>
// }

export default function Index() {
  const { data, error, isPending } = PersonApi.usePersonList()
  if (error) return <div>Failed to load: {error.message}</div>
  if (isPending) return <div>Loading...</div>
  if (!data) return null

  function PersonComponent({ person }: PersonProps) {
    return (
      <li>
        <Link href={`/person/${person.id}`}>{person.name}</Link>
      </li>
    )
  }

  return (
    <div>
      <AppErrorBoundary>
        <ErrorTestComponent />
      </AppErrorBoundary>

      <DedupeTest />
      <DedupeManualTest />

      <h2 className="mt-6 text-xl font-bold">人员列表</h2>
      <ul>
        {data.map((p) => (
          <PersonComponent key={p.id} person={p} />
        ))}
      </ul>
    </div>
  )
}
