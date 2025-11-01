export * from './rest'
// export * from './graphql'

export const Endpoints = {
  chat: '/api/chat',
  kanban: '/api/kanban',
  calendar: '/api/calendar',
  user: {
    me: '/api/user/info',
    roles: '/api/user/roles',
  },
  auth: {
    signIn: '/api/proxy/auth/login',
    refresh: '/api/proxy/auth/refresh',
    signUp: '/api/proxy/auth/sign-up',
    logout: '/api/proxy/auth/logout',
  },
}
