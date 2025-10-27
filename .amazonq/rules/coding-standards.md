# 编码标准规则

## TypeScript 规范

### 类型定义

- 优先使用 `interface` 定义对象类型
- 使用 `type` 定义联合类型和计算类型
- 禁止使用 `any`，使用 `unknown` 替代
- 组件 Props 必须定义接口

```typescript
// ✅ 正确
interface UserProps {
  id: string
  name: string
  email?: string
}

// ❌ 错误
const UserComponent = (props: any) => {}
```

### 函数定义

- 优先使用函数声明而非箭头函数（顶层）
- 组件使用箭头函数
- 异步函数必须正确处理错误

```typescript
// ✅ 组件
const UserCard = ({ user }: UserProps) => {
  return <div>{user.name}</div>
}

// ✅ 工具函数
export function formatDate(date: Date): string {
  return date.toISOString()
}
```

## React 组件规范

### 组件结构

```typescript
'use client' // 客户端组件时必须

import { useState } from 'react'
import type { ComponentProps } from './types'

interface Props extends ComponentProps {
  // 组件特定属性
}

export const ComponentName = ({ prop1, prop2 }: Props) => {
  // 1. Hooks
  const [state, setState] = useState()
  
  // 2. 事件处理函数
  const handleClick = () => {}
  
  // 3. 渲染逻辑
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

### 服务端组件

- 默认使用服务端组件
- 需要交互时才使用 `'use client'`
- 异步组件必须包装在 Suspense 中

```typescript
// ✅ 服务端组件
export default async function UserPage({ params }: { params: { id: string } }) {
  const user = await fetchUser(params.id)
  return <UserProfile user={user} />
}
```

### Cache Components

- 使用 `'use cache'` 指令
- 配合 `cacheLife()` 设置缓存时间
- 使用 `cacheTag()` 进行缓存标记

```typescript
'use cache'

import { cacheLife, cacheTag } from 'next/cache'

export async function CachedUserList() {
  cacheLife('minutes')
  cacheTag('users')
  
  const users = await fetchUsers()
  return <UserList users={users} />
}
```

## 样式规范

### Tailwind CSS

- 优先使用 Tailwind 原子类
- 复杂样式使用 `@apply` 指令
- 响应式设计使用断点前缀

```typescript
// ✅ 正确
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">

// ❌ 避免内联样式
<div style={{ padding: '16px', backgroundColor: 'white' }}>
```

### Material UI

- 使用 MUI 组件作为基础
- 通过 `sx` prop 进行样式定制
- 主题配置统一管理

```typescript
import { Button } from '@mui/material'

<Button
  variant="contained"
  sx={{
    borderRadius: 2,
    textTransform: 'none',
  }}
>
  提交
</Button>
```

## 状态管理

### Zustand Store

```typescript
import { create } from 'zustand'

interface UserStore {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}))
```

## 错误处理

### 异步操作

```typescript
// ✅ 正确的错误处理
async function fetchUserData(id: string) {
  try {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
```

### Error Boundaries

```typescript
'use client'

import { ErrorBoundary } from 'react-error-boundary'

function ErrorFallback({ error }: { error: Error }) {
  return (
    <div role="alert">
      <h2>出错了</h2>
      <pre>{error.message}</pre>
    </div>
  )
}

export function AppWithErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      {children}
    </ErrorBoundary>
  )
}
```

## 性能优化

### 组件优化

- 使用 `React.memo` 包装纯组件
- 使用 `useMemo` 和 `useCallback` 优化计算
- 避免在渲染中创建对象和函数

```typescript
import { memo, useMemo } from 'react'

export const UserList = memo(({ users }: { users: User[] }) => {
  const sortedUsers = useMemo(
    () => users.sort((a, b) => a.name.localeCompare(b.name)),
    [users]
  )
  
  return (
    <ul>
      {sortedUsers.map(user => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  )
})
```

### 动态导入

```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <div>加载中...</div>,
  ssr: false
})
```

## 测试规范

### 组件测试

```typescript
import { render, screen } from '@testing-library/react'
import { UserCard } from './UserCard'

describe('UserCard', () => {
  it('should render user name', () => {
    const user = { id: '1', name: 'John Doe' }
    render(<UserCard user={user} />)
    
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})
```

### API 测试

```typescript
import { GET } from './route'

describe('/api/users', () => {
  it('should return users list', async () => {
    const request = new Request('http://localhost:3000/api/users')
    const response = await GET(request)
    
    expect(response.status).toBe(200)
    const data = await response.json()
    expect(Array.isArray(data)).toBe(true)
  })
})
```
