/**
 * 数据处理策略分析：
 *
 * 优势：
 * ✅ 安全性：服务端验证，防止客户端绕过
 * ✅ SEO友好：服务端渲染，搜索引擎可索引
 * ✅ 简化状态：无需复杂的客户端状态管理
 * ✅ 性能：减少客户端JS包大小
 *
 * 劣势：
 * ❌ 用户体验：表单提交需要页面刷新
 * ❌ 交互限制：无法提供实时反馈
 * ❌ 错误处理：依赖页面状态传递
 *
 * 生产建议：
 * 🔸 数据读取：优先使用服务端组件 + Cache Components
 * 🔸 数据写入：使用 Server Actions（安全性优先）
 * 🔸 用户交互：结合 useOptimistic 实现乐观更新
 * 🔸 混合方案：关键操作服务端，UI交互客户端
 */

import { Suspense } from 'react'
import { Metadata } from 'next'

import { fetchLatestInvoices } from '@/lib/prisma/data'
import { lusitana } from '@/styles/fonts'

import CardWrapper from '../../_components/dashboard/cards'
import LatestInvoices from '../../_components/dashboard/latest-invoices'
import RevenueChart from '../../_components/dashboard/revenue-chart'
import { CardsSkeleton, RevenueChartSkeleton } from '../../_components/skeletons'

export const metadata: Metadata = {
  title: 'dashboard',
  description: 'The official Next.js Course Dashboard, built with App Router.',
}

// 该示例的数据获取都在服务端完成
// 在页面级别，通过 loading.jsx文件（自动创建<Suspense>包裹）。
// 在组件级别，使用<Suspense>进行更细粒度的控制，将阻塞页面的组件单独封装进行流式传输

// 页面级组件，执行 fetchLatestInvoices() 后开始渲染
export default async function Page() {
  // 页面级异步数据获取 - 会阻塞整个页面渲染
  const latestInvoices = await fetchLatestInvoices()

  return (
    <main>
      {/* 静态内容 - 立即渲染 */}
      <h1 className={`${lusitana.className} dashboard mb-4 text-xl md:text-2xl`}>Dashboard</h1>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {/* 动态组件 + 流式传输 - 接口1秒延时后替换骨架屏 */}
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper /> {/* 内部调用 fetchCardData() */}
        </Suspense>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        {/* 动态组件 + 流式传输 - 接口3秒延时后替换骨架屏 */}
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart /> {/* 内部调用 fetchRevenue() */}
        </Suspense>

        {/* 静态展示组件 - 接收props立即渲染 */}
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  )
}
