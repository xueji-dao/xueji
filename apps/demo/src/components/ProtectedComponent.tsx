'use client'

import { type ReactNode, useEffect, useState } from 'react'
import { useAuth } from '@/lib/auth/hooks/useAuth'

interface ProtectedComponentProps {
  children: ReactNode
  requiredRoles?: string[]
  fallback?: ReactNode
  loadingComponent?: ReactNode
}

export const ProtectedComponent = ({
  children,
  requiredRoles = [],
  fallback = <div>Access Denied</div>,
  loadingComponent = <div>Loading...</div>,
}: ProtectedComponentProps) => {
  const { isAuthenticated, checkPermission, isLoading } = useAuth()
  const [hasPermission, setHasPermission] = useState<boolean | null>(null)

  useEffect(() => {
    const verifyPermission = async () => {
      if (!isAuthenticated) {
        setHasPermission(false)
        return
      }

      if (requiredRoles.length === 0) {
        setHasPermission(true)
        return
      }

      const permitted = await checkPermission(requiredRoles)
      setHasPermission(permitted)
    }

    verifyPermission()
  }, [isAuthenticated, requiredRoles, checkPermission])

  if (isLoading || hasPermission === null) {
    return <>{loadingComponent}</>
  }

  if (!isAuthenticated || !hasPermission) {
    return <>{fallback}</>
  }

  return <>{children}</>
}