'use client'

import { usePathname } from '@/routes'

import Header from './Header'

// TODO 使用路由组：重构目录结构，将不同布局的页面分组, root layout 只有基础设置
// 不显示 Header 的页面路径
const NO_HEADER_PATHS = ['/login', '/register', '/blank', '/404', '/500', '/img', '/zustand']

export function ConditionalHeader() {
  const pathname = usePathname()

  // 检查当前路径是否需要隐藏 Header
  const shouldHideHeader = NO_HEADER_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`))

  if (shouldHideHeader) {
    return null
  }

  return <Header />
}
