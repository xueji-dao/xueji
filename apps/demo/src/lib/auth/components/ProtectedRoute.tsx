'use client'

import { type ReactNode } from 'react'
import { useAuth, usePermissions } from '../hooks'

interface ProtectedRouteProps {
  children: ReactNode
  requireAuth?: boolean
  requiredRoles?: string[]
  requiredPermissions?: string[]
  fallback?: ReactNode
}

export const ProtectedRoute = ({
  children,
  requireAuth = true,
  requiredRoles = [],
  requiredPermissions = [],
  fallback = <div>Access Denied</div>,
}: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth()
  const { hasAnyRole, hasPermission, isLoading: permLoading } = usePermissions()

  if (authLoading || permLoading) {
    return <div>Loading...</div>
  }

  if (requireAuth && !isAuthenticated) {
    return fallback
  }

  if (requiredRoles.length > 0 && !hasAnyRole(requiredRoles)) {
    return fallback
  }

  if (requiredPermissions.length > 0 && !requiredPermissions.every(hasPermission)) {
    return fallback
  }

  return <>{children}</>
}