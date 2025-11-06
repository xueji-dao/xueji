'use client'

import { type ReactNode } from 'react'

import { usePermission } from '@/lib/auth/hooks/usePermission'

/**
 * 权限保护组件 - 根据角色和权限控制内容显示
 *
 * @example
 * 角色检查 - 任一角色即可访问
 * <ProtectedComponent requiredRoles={['admin', 'manager']}>
 *   管理员内容
 * </ProtectedComponent>
 *
 * @example
 * 权限检查 - 需要所有权限
 * <ProtectedComponent requiredPermissions={['user:read', 'user:write']}>
 *   需要读写权限的内容
 * </ProtectedComponent>
 *
 * @example
 * 组合检查 - 需要角色且有权限
 * <ProtectedComponent
 *   requiredRoles={['admin']}
 *   requiredPermissions={['system:config']}
 *   fallback={<div>权限不足</div>}
 * >
 *   系统配置页面
 * </ProtectedComponent>
 */
interface ProtectedComponentProps {
  /** 子组件内容 */
  children: ReactNode
  /** 必需的角色列表 - 用户拥有任一角色即可访问 */
  requiredRoles?: string[]
  /** 必需的权限列表 - 用户必须拥有所有权限才能访问 */
  requiredPermissions?: string[]
  /** 权限不足时显示的内容 */
  fallback?: ReactNode
  /** 加载中显示的内容 */
  loadingComponent?: ReactNode
}

export const ProtectedComponent = ({
  children,
  requiredRoles = [],
  requiredPermissions = [],
  fallback = <div>Access Denied</div>,
  loadingComponent = <div>Loading...</div>,
}: ProtectedComponentProps) => {
  const { hasAnyRole, hasPermission, isLoading } = usePermission()

  if (isLoading) {
    return <>{loadingComponent}</>
  }

  // 检查角色权限
  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    return <>{fallback}</>
  }

  // 检查具体权限
  if (requiredPermissions.length > 0 && !requiredPermissions.every((permission) => hasPermission(permission))) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
