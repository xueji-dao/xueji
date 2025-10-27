# 组件开发指南

## 组件组合模式选择

### 1. 直接导入 (默认选择)

**适用场景**: 固定结构、功能明确的组件

```tsx
// 推荐：固定布局组件
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function Layout() {
  return (
    <div>
      <Header />
      <Sidebar />
      <main>内容区域</main>
      <Footer />
    </div>
  )
}
```

### 2. Children Props (单个灵活插槽)

**适用场景**: 通用容器、包装组件、条件渲染

```tsx
// 容器组件
function Card({ className, children }) {
  return (
    <div className={`card ${className}`}>
      {children}
    </div>
  )
}

// 使用 - 内容完全灵活
<Card className="shadow">
  <h3>任意标题</h3>
  <p>任意内容</p>
  <Button>任意操作</Button>
</Card>
```

### 3. 命名 Props (多个插槽)

**适用场景**: 需要多个明确位置的内容插槽

```tsx
// 多插槽布局
function Modal({ title, actions, children }) {
  return (
    <div className="modal">
      <div className="modal-header">{title}</div>
      <div className="modal-body">{children}</div>
      <div className="modal-footer">{actions}</div>
    </div>
  )
}

// 使用 - 明确的内容分区
<Modal
  title={<h2>确认操作</h2>}
  actions={
    <>
      <Button>取消</Button>
      <Button>确认</Button>
    </>
  }
>
  <p>确定要执行此操作吗？</p>
</Modal>
```

## Next.js 流式渲染策略

### 1. 页面级流式 (loading.tsx)

**自动 Suspense 包装整个页面**

```
app/dashboard/
├── loading.tsx    # 自动包装页面
└── page.tsx
```

```tsx
// loading.tsx
export default function Loading() {
  return <div>页面加载中...</div>
}
```

### 2. 组件级流式 (手动 Suspense)

**精确控制加载状态**

```tsx
export default function Dashboard() {
  return (
    <div>
      <h1>仪表板</h1>
      
      {/* 快速加载的内容 */}
      <Suspense fallback={<QuickDataSkeleton />}>
        <QuickData />
      </Suspense>
      
      {/* 慢速加载的内容 */}
      <Suspense fallback={<SlowDataSkeleton />}>
        <SlowData />
      </Suspense>
    </div>
  )
}
```

### 3. 并行路由流式

**多个独立区域同时流式加载**

```
app/dashboard/
├── layout.tsx
├── @analytics/
│   └── page.tsx
├── @notifications/
│   └── page.tsx
└── default.tsx
```

```tsx
// layout.tsx
export default function DashboardLayout({
  children,
  analytics,
  notifications
}) {
  return (
    <div className="dashboard">
      {children}
      <Suspense fallback={<AnalyticsSkeleton />}>
        {analytics}
      </Suspense>
      <Suspense fallback={<NotificationsSkeleton />}>
        {notifications}
      </Suspense>
    </div>
  )
}
```

## 使用决策树

```
需要组合组件？
├── 固定结构 → 直接导入
├── 单个灵活内容 → children props
├── 多个明确插槽 → 命名 props
└── 路由级别组合 → Parallel Routes

需要异步加载？
├── 整个页面慢 → loading.tsx
├── 部分组件慢 → Suspense
├── 多个独立区域 → Parallel Routes + Suspense
└── API 流式响应 → Route Handlers
```

## 项目约定

### 组件文件结构

```
components/
├── ui/              # 基础 UI 组件
│   ├── Button/
│   ├── Card/
│   └── Modal/
├── layout/          # 布局组件
│   ├── Header/
│   ├── Sidebar/
│   └── Footer/
└── business/        # 业务组件
    ├── UserProfile/
    ├── ProductList/
    └── OrderForm/
```

### 命名规范

- **组件**: PascalCase (`UserProfile`)
- **文件**: PascalCase (`UserProfile.tsx`)
- **Props**: camelCase (`userName`, `isActive`)
- **插槽**: 语义化命名 (`header`, `sidebar`, `actions`)

### 导入导出约定

```tsx
// 默认导出组件
export default function ComponentName() {}

// 命名导出类型
export type ComponentProps = {}

// 统一导入顺序
import React from 'react'           // React 相关
import { NextPage } from 'next'     // Next.js 相关
import { Button } from '@/ui'       // 内部组件
import clsx from 'clsx'            // 第三方库
```

## 最佳实践

1. **优先选择直接导入**，需要灵活性时才使用插槽
2. **Suspense 边界要合理**，避免过度嵌套
3. **loading 状态要有意义**，提供有用的反馈
4. **并行路由用于独立功能**，不要滥用
5. **组件职责要单一**，便于测试和维护

## 性能考虑

- **流式渲染优先级**: 关键内容 > 次要内容
- **Suspense 粒度**: 平衡用户体验和复杂度
- **并行加载**: 利用 Parallel Routes 提升性能
- **代码分割**: 配合 dynamic import 使用
