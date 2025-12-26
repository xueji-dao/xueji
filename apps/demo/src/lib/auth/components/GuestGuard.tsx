'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { CONFIG } from '@/global-config'
import { safeReturnUrl } from 'minimal-shared/utils'

import { SplashScreen } from '@/components/loading-screen'

import { useAuth } from '../hooks'

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: React.ReactNode
}

export function GuestGuard({ children }: GuestGuardProps) {
  const router = useRouter()

  const { isChecking: loading, isAuthenticated } = useAuth()

  const [isChecking, setIsChecking] = useState(true)

  const searchParams = useSearchParams()
  const redirectUrl = safeReturnUrl(searchParams.get('returnTo'), CONFIG.auth.redirectPath)

  const checkPermissions = async (): Promise<void> => {
    if (loading) {
      return // 等待认证系统初始化
    }

    if (isAuthenticated) {
      router.replace(redirectUrl)
      return // 跳转后立即返回，不设置 isChecking=false
    }

    setIsChecking(false) // 只有未认证用户才设置为 false
  }

  useEffect(() => {
    checkPermissions()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, loading])

  if (isChecking) {
    return <SplashScreen />
  }

  return <>{children}</>
}
