import { useQuery } from '@tanstack/react-query'

import api from '@/lib/api/request'

import { Endpoints } from '../index'

export interface User {
  id: string
  nickname?: string | null
  email?: string | null
  avatar?: string | null
  username?: string | null
  roles?: string[]
  permissions?: string[]
  createdAt?: string
  updatedAt?: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export async function fetchUser(userId: string): Promise<User> {
  return api.get(`/users/${userId}`)
}
