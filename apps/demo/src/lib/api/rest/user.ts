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

export async function fetchUser(): Promise<User> {
  return api.get(Endpoints.user.me)
}

// TODO: 修正返回类型
export async function fetchUserPermissions(): Promise<User> {
  return api.get(Endpoints.user.roles)
}
