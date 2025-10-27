# Next.js 16 特性使用规则

## App Router 模式

### 文件约定

- `page.tsx` - 页面组件
- `layout.tsx` - 布局组件
- `loading.tsx` - 加载状态
- `error.tsx` - 错误边界
- `not-found.tsx` - 404 页面
- `route.ts` - API 路由

### 异步 API (Next.js 16 重要变更)

#### params 和 searchParams 现在是异步的

```typescript
// ✅ Next.js 16 正确写法
export default async function Page({ 
  params,
  searchParams 
}: { 
  params: Promise<{ id: string }>
  searchParams: Promise<{ q?: string }>
}) {
  const { id } = await params
  const { q } = await searchParams
  
  const user = await fetchUser(id)
  return <UserProfile user={user} query={q} />
}

// ✅ generateStaticParams 集成
export async function generateStaticParams() {
  return [
    { id: 'build' }, // 构建时预渲染
    { id: 'static' }
  ]
}

// 访问 /users/build → 构建时渲染
// 访问 /users/runtime → 运行时渲染（PPR 动态洞）
```

#### cookies 和 headers 异步化

```typescript
import { cookies, headers } from 'next/headers'

export default async function Page() {
  // ✅ Next.js 16 正确写法
  const cookieStore = await cookies()
  const headersList = await headers()
  
  const token = cookieStore.get('auth-token')
  const userAgent = headersList.get('user-agent')
  
  return <div>Token: {token?.value}</div>
}
```

### 服务端组件 (默认)

```typescript
// 默认是服务端组件，可以直接使用异步
export default async function UserPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const user = await fetchUser(id)
  return <UserProfile user={user} />
}
```

### 客户端组件

```typescript
'use client'

import { useState } from 'react'

export default function InteractiveComponent() {
  const [count, setCount] = useState(0)
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  )
}
```

### 混合使用

```typescript
// 服务端组件
import { ClientCounter } from './client-counter'

export default async function MixedPage() {
  const data = await fetchData() // 服务端获取数据
  
  return (
    <div>
      <h1>服务端渲染的标题</h1>
      <ClientCounter initialData={data} />
    </div>
  )
}
```

## 数据获取

### 服务端数据获取

```typescript
// ✅ Next.js 16 页面级别（异步 params）
export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const post = await fetch(`/api/posts/${id}`).then(res => res.json())
  return <Post data={post} />
}

// ✅ 组件级别缓存
async function PostContent({ id }: { id: string }) {
  'use cache'
  cacheLife('hours')
  cacheTag(`post-${id}`)
  
  const post = await fetchPost(id)
  return <article>{post.content}</article>
}
```

### 并行数据获取

```typescript
export default async function Dashboard() {
  // 并行获取数据
  const [users, posts, stats] = await Promise.all([
    fetchUsers(),
    fetchPosts(), 
    fetchStats()
  ])
  
  return (
    <div>
      <UserList users={users} />
      <PostList posts={posts} />
      <StatsPanel stats={stats} />
    </div>
  )
}
```

### 流式渲染

```typescript
import { Suspense } from 'react'

export default function StreamingPage() {
  return (
    <div>
      <h1>即时显示的内容</h1>
      
      <Suspense fallback={<UsersSkeleton />}>
        <Users />
      </Suspense>
      
      <Suspense fallback={<PostsSkeleton />}>
        <Posts />
      </Suspense>
    </div>
  )
}
```

## 路由和导航

### 动态路由

```
app/
├── users/
│   ├── page.tsx          # /users
│   └── [id]/
│       ├── page.tsx      # /users/[id]
│       └── edit/
│           └── page.tsx  # /users/[id]/edit
```

### 路由组

```
app/
├── (dashboard)/
│   ├── analytics/
│   └── settings/
└── (auth)/
    ├── login/
    └── register/
```

### 并行路由

```
app/
├── @sidebar/
│   └── page.tsx
├── @main/
│   └── page.tsx
└── layout.tsx
```

## 代理/中间件

### 基础代理 (Next.js 16 新名称)

```typescript
// proxy.ts (Next.js 16 新文件名)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  // 认证检查
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    const token = request.cookies.get('auth-token')
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/api/:path*']
}
```

## Cache Components

### 公共缓存 (Public Cache)

#### 函数级缓存

```typescript
'use cache'

import { cacheLife, cacheTag } from 'next/cache'

// 函数级缓存 - 推荐模式
async function getCachedData(id: string) {
  'use cache'
  cacheLife('frequent') // 预设配置：stale=30s, revalidate=5min, expire=1h
  cacheTag(`data-${id}`)
  
  return await fetchData(id)
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getCachedData(params.id)
  return <div>{data}</div>
}
```

#### 组件级缓存

```typescript
'use cache'

import { cacheLife, cacheTag } from 'next/cache'

export async function CachedComponent({ userId }: { userId: string }) {
  // 自定义缓存配置
  cacheLife({ stale: 300, revalidate: 3600, expire: 86400 }) // 5min, 1h, 1day
  cacheTag(`user-${userId}`, 'users') // 多标签支持
  
  const data = await fetchUserData(userId)
  return <UserDisplay data={data} />
}

// 使用时必须包装在 Suspense 中
<Suspense fallback={<Loading />}>
  <CachedComponent userId="123" />
</Suspense>
```

### 私有缓存 (Private Cache)

#### 用户特定数据缓存

```typescript
'use cache: private'

import { cookies, headers } from 'next/headers'
import { cacheLife } from 'next/cache'

export async function UserSpecificData() {
  // 私有缓存配置 - 必须 stale >= 30s 才会被预取
  cacheLife({ stale: 420 }) // 7分钟
  
  // 可以访问用户特定数据
  const cookie = (await cookies()).get('user-token')
  const userAgent = (await headers()).get('user-agent')
  
  const userData = await fetchUserData(cookie?.value)
  return <UserProfile data={userData} />
}

// 私有缓存必须包装在 Suspense 中
export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <UserSpecificData />
    </Suspense>
  )
}
```

### 缓存键规则

```typescript
// 缓存键只基于可序列化参数
async function getCachedRandom(x: number, children: React.ReactNode) {
  'use cache'
  return {
    x,
    y: Math.random(), // 会被缓存
    children,         // 非序列化参数，每次重新渲染
  }
}

// 缓存键 = hash(buildId + functionId + {x})
// children 不影响缓存键，但每次都会重新渲染
```

### 预设缓存配置

```typescript
// 预设配置（推荐使用）
cacheLife('frequent')  // stale: 30s, revalidate: 5min, expire: 1h
cacheLife('minutes')   // stale: 30s, revalidate: 1min, expire: 5min  
cacheLife('hours')     // stale: 30s, revalidate: 1h, expire: 1day
cacheLife('days')      // stale: 30s, revalidate: 1day, expire: 1week
cacheLife('weeks')     // stale: 30s, revalidate: 1week, expire: 1month
cacheLife('max')       // stale: 30s, revalidate: 1year, expire: 1year

// 自定义配置
cacheLife({ stale: 60, revalidate: 300, expire: 3600 })
```

### 预取策略

| 缓存类型 | Stale 时间 | Expire 时间 | 静态预取 | 运行时预取 |
|---------|-----------|------------|---------|----------|
| Public  | Any       | >= 5min    | ✅      | ✅       |
| Public  | >= 30s    | < 5min     | ❌      | ✅       |
| Public  | < 30s     | < 5min     | ❌      | ❌       |
| Private | >= 30s    | Any        | ❌      | ✅       |
| Private | < 30s     | Any        | ❌      | ❌       |

### 缓存失效

```typescript
// API 路由中
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const { tag } = await request.json()
  
  // 精确失效特定标签
  revalidateTag(tag)
  
  // 失效多个标签
  revalidateTag('users')
  revalidateTag('posts')
  
  return Response.json({ success: true })
}

// 客户端触发
const invalidateUserCache = async (userId: string) => {
  await fetch('/api/cache/invalidate', {
    method: 'POST',
    body: JSON.stringify({ tag: `user-${userId}` })
  })
}
```

## 性能优化

### 图片优化

```typescript
import Image from 'next/image'

export function OptimizedImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority // 首屏图片
      placeholder="blur" // 模糊占位符
    />
  )
}
```

### 字体优化

```typescript
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
```

### 代码分割

```typescript
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <p>加载中...</p>,
  ssr: false // 禁用服务端渲染
})
```

### Bundle 分析

```typescript
// next.config.ts
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig = {
  experimental: {
    cacheComponents: true, // 启用 Cache Components
  },
}

export default withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})(nextConfig)
```

## 元数据管理

### 静态元数据

```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '学记助理',
  description: '智能学习助手',
  keywords: ['学习', '教育', 'AI'],
}
```

### 动态元数据

```typescript
// ✅ Next.js 16 异步 params
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}): Promise<Metadata> {
  const { id } = await params
  const post = await fetchPost(id)
  
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  }
}
```

## 重要约束和最佳实践

### Cache Components 约束

```typescript
// ❌ 禁用的段配置（启用 cacheComponents 时）
export const dynamic = 'force-static'      // 构建错误
export const revalidate = 60                // 构建错误
export const fetchCache = 'force-cache'     // 构建错误

// ✅ 使用 Cache Components 替代
'use cache'
cacheLife('hours')
cacheTag('my-data')
```

### 执行上下文规则

```typescript
// ✅ 服务端组件 - 可以使用 'use cache'
export default async function Page() {
  'use cache'
  return <div>Content</div>
}

// ❌ API 路由 - 不能使用 'use cache'
export async function GET() {
  // 'use cache' 无效 - 不是 React 组件树的一部分
  return Response.json({})
}

// ❌ 代理/中间件 - 不能使用 'use cache'
export function proxy(request: NextRequest) {
  // 'use cache' 无效 - 请求转换层
  return NextResponse.next()
}

// 或旧的中间件写法（已弃用）
export function middleware(request: NextRequest) {
  // 'use cache' 无效 - 请求转换层
  return NextResponse.next()
}
```

### Draft Mode 行为

```typescript
// Draft Mode 完全绕过缓存
async function getCachedValue() {
  'use cache'
  return Date.now()
}

// Draft Mode 禁用: 返回缓存值
// Draft Mode 启用: 每次返回新值（绕过缓存）
```

### 性能优化建议

1. **优先使用函数级缓存**而非组件级缓存
2. **合理设置 stale 时间**：>= 30s 才能被预取
3. **使用多标签策略**：精确控制缓存失效
4. **避免过度缓存**：不是所有数据都需要缓存
5. **配合 Suspense**：所有缓存组件必须包装
