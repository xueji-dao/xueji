import { Endpoints } from '../index'

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const response = await fetch(Endpoints.auth.signIn, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  const data = await response.json()
  if (!response.ok) {
    throw new Error(data.error || 'Login failed')
  }
  return data
}

export const logout = async (): Promise<void> => {
  const response = await fetch(Endpoints.auth.logout, {
    method: 'POST',
    credentials: 'include',
  })

  if (!response.ok) {
    const data = await response.json()
    throw new Error(data.error || 'Logout failed')
  }

  const data = await response.json()
  if (!data.backendSuccess) {
    throw new Error('Backend logout failed, but local session cleared')
  }
}
