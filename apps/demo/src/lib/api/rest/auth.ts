import { nextApi } from '@/lib/api/client'

import { Endpoints } from '../index'

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface LogoutResponse {
  success: boolean
  backendSuccess: boolean
}

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  return await nextApi.post(Endpoints.auth.signIn, credentials)
}

export const logout = async (): Promise<void> => {
  const data = await nextApi.post<LogoutResponse>(Endpoints.auth.logout)
  if (!data.backendSuccess) {
    throw new Error('Backend logout failed, but local session cleared')
  }
}
