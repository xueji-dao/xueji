import { useEffect } from 'react'

import { useAuth } from '../hooks/useAuth'

interface Props {
  children: React.ReactNode
}

export function AuthProvider({ children }: Props) {
  const { checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return <>{children}</>
}
