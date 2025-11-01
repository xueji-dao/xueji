# 授权方案架构文档

## 1. 概述

### 技术栈

- **前端**: Next.js 16 (App Router) + Zustand + React Query + TypeScript
- **状态管理**: Zustand (认证状态) + React Query (服务端数据缓存)
- **HTTP 客户端**: Axios (业务请求) + Fetch (认证请求)
- **认证策略**: Access Token (15分钟) + Refresh Token (7天)

### 安全原则

- **职责分离**: 认证操作与业务操作分离
- **自动刷新**: Axios 拦截器实现无感知 token 续期
- **安全存储**: Refresh Token 存储在 httpOnly Cookie

## 2. 架构设计

### 2.1 存储策略

| 数据类型 | 存储位置 | 生命周期 | 安全级别 | 用途 |
|---------|---------|---------|---------|------|
| Refresh Token | httpOnly Cookie | 7天 | 高 | 获取新的 Access Token |
| Access Token | Zustand Store (localStorage) | 15分钟 | 中 | API 请求认证 |
| User Info | React Query Cache | 5-10分钟 | 低 | 用户数据缓存 |
| Permissions | React Query Cache | 10分钟 | 中 | 权限数据缓存 |

### 2.2 请求架构

```
前端请求
    ├── 认证操作 (fetch)
    │   ├── /api/proxy/auth/login   (登录)
    │   ├── /api/proxy/auth/logout  (登出)
    │   └── /api/auth/refresh       (刷新token)
    │   └── 特点: 不走拦截器，避免循环调用
    │
    └── 业务操作 (axios)
        ├── fetchUser()             (用户信息)
        ├── fetchUserPermissions()  (权限数据)
        └── 其他业务 API
        └── 特点: 走拦截器，自动处理 401 刷新
```

## 3. 实现细节

### 3.1 Zustand Store 设计

```typescript
// stores/auth.ts
export type AuthState = {
  accessToken: string | null
  isAuthenticated: boolean
}

export type AuthActions = {
  setAuth: (token: string) => void
  clearAuth: () => void
}

// 持久化配置 (localStorage)
partialize: (state) => ({
  accessToken: state.accessToken,
  isAuthenticated: state.isAuthenticated
})
```

### 3.2 useAuth Hook

```typescript
// hooks/useAuth.ts
export const useAuth = () => {
  const { isAuthenticated, accessToken, setAuth, clearAuth } = useAuthStore()
  const queryClient = useQueryClient()

  // 用户数据 (React Query)
  const { data: user, isLoading: isUserLoading } = useQuery({
    queryKey: ['user', 'me'],
    queryFn: () => fetchUser('me'),
    enabled: isAuthenticated,
    staleTime: 5 * 60 * 1000,
  })

  // 权限数据 (React Query)
  const { data: authData, isLoading: isPermissionsLoading } = useQuery({
    queryKey: ['user', 'permissions'],
    queryFn: () => fetchUserPermissions(),
    enabled: isAuthenticated,
    staleTime: 10 * 60 * 1000,
  })

  // 登录 (useMutation)
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await fetch('/api/proxy/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      })
      return response.json()
    },
    onSuccess: (data) => {
      setAuth(data.accessToken)
      setAxiosAuth(data.accessToken)
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })

  return {
    user,
    permissions: authData?.permissions || [],
    roles: authData?.roles || [],
    isAuthenticated,
    isLoading: isUserLoading || isPermissionsLoading,
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    hasPermission: (permission) => authData?.permissions?.includes(permission),
    hasRole: (role) => authData?.roles?.includes(role),
  }
}
```

### 3.3 Next.js 代理 API

#### `/api/auth/login` - 登录

```typescript
export async function POST(request: NextRequest) {
  // 1. 转发登录请求到 Java 后端
  // 2. 获取 tokens
  // 3. 设置 refresh token 到 httpOnly cookie
  // 4. 返回 access token 给前端
}
```

#### `/api/auth/me` - 认证检查

```typescript
export async function GET(request: NextRequest) {
  // 1. 从 cookie 获取 refresh token
  // 2. 调用后端刷新 access token
  // 3. 用新 token 获取用户信息
  // 4. 返回用户数据
}
```

#### `/api/auth/refresh` - Token 刷新

```typescript
export async function POST(request: NextRequest) {
  // 1. 从 cookie 获取 refresh token
  // 2. 调用后端刷新接口
  // 3. 更新 refresh token cookie
  // 4. 返回新的 access token
}
```

#### `/api/auth/logout` - 退出登录

```typescript
export async function POST(request: NextRequest) {
  // 1. 调用后端退出接口
  // 2. 清除 refresh token cookie
  // 3. 返回成功状态
}
```

### 3.4 Axios 拦截器设计

```typescript
// lib/api/request.ts
const api = axios.create({
  baseURL: '/api',
  timeout: 10000,
})

// 请求拦截器 - 自动添加 token
api.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState()
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

// 响应拦截器 - 自动刷新 token
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        // 刷新 token
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        })

        if (response.ok) {
          const { accessToken } = await response.json()
          
          // 更新 store 和 axios 头
          const { setAuth } = useAuthStore.getState()
          setAuth(accessToken)
          setAxiosAuth(accessToken)

          // 重试原始请求
          originalRequest.headers.Authorization = `Bearer ${accessToken}`
          return api(originalRequest)
        } else {
          // 刷新失败，清除状态
          const { clearAuth } = useAuthStore.getState()
          clearAuth()
          window.location.href = '/login'
        }
      } catch (refreshError) {
        // 处理刷新异常
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)
```

### 3.5 认证流程设计

#### 应用启动流程

```
应用启动
    ↓
AuthGuard 执行 checkAuth
    ↓
检查 localStorage 中的 token
    ↓
token 有效？
    ├── 是：设置 axios 认证头
    └── 否：清除状态，等待用户登录
    ↓
useQuery 自动获取用户数据
```

#### 自动刷新流程

```
业务 API 请求 (axios)
    ↓
携带 Access Token
    ↓
收到 401 响应
    ↓
Axios 拦截器触发
    ↓
调用 /api/auth/refresh (fetch)
    ↓
刷新成功？
    ├── 是：更新 token，重试原请求
    └── 否：清除状态，跳转登录
```

#### 并发请求队列

```typescript
// 防止并发刷新
let isRefreshing = false
let failedQueue = []

if (isRefreshing) {
  // 将请求加入队列等待
  return new Promise((resolve, reject) => {
    failedQueue.push({ resolve, reject })
  })
}
```

### 3.6 Quarkus 后端集成

```java
@ApplicationScoped
public class CookieJwtAuthenticationMechanism implements HttpAuthenticationMechanism {
    
    private String extractToken(RoutingContext context) {
        HttpServerRequest request = context.request();
        
        // 优先从 Authorization Header 获取
        String authHeader = request.getHeader("Authorization");
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        
        // 备选：从 Cookie 获取
        Cookie cookie = request.getCookie("refresh-token");
        if (cookie != null) {
            return cookie.getValue();
        }
        
        return null;
    }
}
```

## 4. 使用指南

### 4.1 开发者使用

#### 检查认证状态

```typescript
const { user, isAuthenticated, isLoading, hasPermission } = useAuth()

if (isLoading) return <Loading />
if (!isAuthenticated) return <LoginForm />

// 权限检查
if (hasPermission('admin:users')) {
  return <AdminPanel />
}

return <Dashboard user={user} />
```

#### 路由保护

```typescript
// 应用级保护
<AuthGuard>
  {children}
</AuthGuard>

// 页面级保护
<ProtectedRoute requiredPermissions={['posts:write']}>
  <CreatePost />
</ProtectedRoute>
```

#### API 请求

```typescript
// 业务数据 - 自动处理认证
const { data: users } = useQuery({
  queryKey: ['users'],
  queryFn: () => fetchUsers(), // 内部使用 axios
})

// 认证操作 - 直接使用 fetch
const { login } = useAuth()
login({ email, password }) // 内部使用 fetch
```

#### 错误处理

```typescript
try {
  const response = await apiRequest('/api/users')
  if (response.status === 401) {
    // Token 过期，自动跳转登录
    router.push('/login')
  }
} catch (error) {
  console.error('API request failed:', error)
}
```

### 4.2 部署配置

#### 环境变量

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
JWT_SECRET=your-jwt-secret
REFRESH_TOKEN_EXPIRES_IN=604800  # 7天（秒）
NODE_ENV=production
```

#### Cookie 安全设置

```typescript
// 生产环境 Cookie 配置
res.cookie('refreshToken', token, {
  httpOnly: true,              // 防止 XSS
  secure: process.env.NODE_ENV === 'production', // 仅 HTTPS
  sameSite: 'strict',          // 防止 CSRF
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7天
  path: '/',
})
```

## 5. 安全考虑

### 5.1 XSS 防护

- **httpOnly Cookie**: Refresh Token 不可被 JavaScript 访问
- **CSP 策略**: 限制脚本执行来源
- **输入验证**: 所有用户输入进行转义

### 5.2 CSRF 防护

- **SameSite Cookie**: 限制跨站请求
- **Origin 检查**: 验证请求来源
- **双重提交**: 关键操作需要二次确认

### 5.3 Token 泄露防护

- **短期 Access Token**: 15分钟自动过期
- **Token 轮换**: Refresh Token 定期更新
- **异常检测**: 监控异常登录行为

## 6. 最佳实践

### 6.1 错误处理

```typescript
// 统一错误处理
const handleAuthError = (error: Error) => {
  if (error.message.includes('401')) {
    // 清除本地状态，跳转登录
    useUserStore.getState().clearUser()
    router.push('/login')
  } else {
    // 显示错误提示
    toast.error('操作失败，请重试')
  }
}
```

### 6.2 性能优化

- **Token 缓存**: Access Token 在内存中缓存
- **请求合并**: 避免并发刷新 Token
- **预加载**: 关键页面提前获取数据

### 6.3 监控日志

```typescript
// 认证事件日志
console.log('Auth Event:', {
  type: 'login|logout|refresh|error',
  userId: user?.id,
  timestamp: new Date().toISOString(),
  userAgent: navigator.userAgent,
})
```

## 7. 故障排查

### 7.1 常见问题

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 登录后立即退出 | Token 格式错误 | 检查 JWT 签名和格式 |
| 页面刷新后需要重新登录 | Cookie 未设置 | 检查 httpOnly cookie 配置 |
| API 请求 401 错误 | Token 过期 | 检查 token 刷新逻辑 |
| 跨域问题 | CORS 配置 | 配置后端 CORS 策略 |

### 7.2 调试工具

- **浏览器开发者工具**: 检查 Cookie 和网络请求
- **Zustand DevTools**: 监控状态变化
- **后端日志**: 查看认证失败原因

---

## 总结

本授权方案基于 **Zustand + React Query + Axios 拦截器** 架构，实现了：

### 核心特性

- **职责分离**: 认证操作(fetch) 与业务操作(axios) 分离
- **自动刷新**: Axios 拦截器实现无感知 token 续期
- **状态管理**: Zustand 管理认证状态，React Query 管理服务端数据
- **权限控制**: 基于角色的权限检查和路由保护
- **安全存储**: httpOnly Cookie + localStorage 分层存储

### 技术优势

- **性能优化**: React Query 缓存减少重复请求
- **开发体验**: 统一的 useAuth hook 和权限检查
- **错误处理**: 拦截器统一处理 401 错误和重试
- **类型安全**: 完整的 TypeScript 类型定义

该方案适用于现代 React 应用，在保证安全性的同时提供了优秀的开发体验和用户体验。
