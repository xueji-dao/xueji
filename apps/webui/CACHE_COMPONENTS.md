# Next.js 16 Cache Components 使用指南

## 概述

Cache Components 是 Next.js 16 引入的新功能，允许你缓存 React 组件的输出，提高应用性能。

## 配置

在 `next.config.ts` 中启用：

```typescript
const nextConfig: NextConfig = {
  experimental: {
    cacheComponents: true,
  },
}
```

## 基础用法

### 1. 基础缓存组件

```tsx
'use cache'

export async function CachedComponent() {
  const data = await fetchData()
  return <div>{data}</div>
}
```

### 2. 高级缓存配置

```tsx
'use cache'

import { cacheLife, cacheTag } from 'next/cache'

export async function AdvancedCachedComponent({ userId }: { userId: string }) {
  // 设置缓存生命周期
  cacheLife('minutes') // 5分钟
  // cacheLife('hours')   // 1小时
  // cacheLife('days')    // 1天
  // cacheLife('weeks')   // 1周
  
  // 添加缓存标签
  cacheTag(`user-${userId}`)
  
  const userData = await fetchUserData(userId)
  return <div>{userData.name}</div>
}
```

## 缓存失效

### API 路由中使缓存失效

```tsx
import { revalidateTag } from 'next/cache'

export async function POST(request: Request) {
  const { tag } = await request.json()
  revalidateTag(tag)
  return Response.json({ success: true })
}
```

### 客户端触发缓存失效

```tsx
'use client'

export function InvalidateButton() {
  const handleInvalidate = async () => {
    await fetch('/api/cache/invalidate', {
      method: 'POST',
      body: JSON.stringify({ tag: 'user-123' })
    })
  }
  
  return <button onClick={handleInvalidate}>清除缓存</button>
}
```

## 最佳实践

1. **使用 Suspense 边界**：缓存组件应该包装在 Suspense 中
2. **合理设置缓存生命周期**：根据数据更新频率选择合适的缓存时间
3. **使用缓存标签**：为精确的缓存失效控制添加标签
4. **避免过度缓存**：不是所有组件都需要缓存

## 演示页面

- 主页：`/` - 基础缓存演示
- 完整演示：`/cache-demo` - 包含所有缓存功能的演示

## 注意事项

- Cache Components 目前是实验性功能
- 需要 Next.js 16+ 和 React 19+
- 缓存的组件必须是异步函数组件
- 'use cache' 指令必须在文件顶部