import { useEffect } from 'react'

import { useAuth } from '../hooks/useAuth'

interface Props {
  children: React.ReactNode
}

export function AuthGuard({ children }: Props) {
  const { checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return <>{children}</>
}
