export interface User {
  id: string
  username: string
  email: string
  nickname: string
}

export interface AuthContext {
  userId: string
  token: string
}
