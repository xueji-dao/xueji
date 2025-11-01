export interface User {
  id: string
  username: string
  email: string
  nickname: string
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface LoginResponse {
  access_token: string
  refresh_token: string
  expires_in: number
  user: User
}

export interface AuthContext {
  userId: string
  token: string
}