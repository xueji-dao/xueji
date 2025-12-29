import { Metadata } from 'next'

import SideNav from '../_components/dashboard/sidenav'

export const metadata: Metadata = {
  title: {
    template: '%s | Acme Dashboard',
    default: 'Acme Dashboard',
  },
  description: 'The official Next.js Learn Dashboard built with App Router.',
}

// PPR 在 Next.js 16 中默认启用，无需显式配置
// 每个子路由都会被包装在这个结构中
// 可以将导航、头部、底部等公共元素统一管理，避免在每个页面重复编写相同的布局代码。
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
      <div className="w-full flex-none md:w-32">
        <SideNav /> {/* 侧边导航 */}
      </div>
      <div className="grow p-3 md:overflow-y-auto md:p-6">{children}</div> {/* 页面内容 */}
    </div>
  )
}
