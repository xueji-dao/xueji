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

| 数据类型      | 存储位置                     | 生命周期 | 安全级别 | 用途                  |
| ------------- | ---------------------------- | -------- | -------- | --------------------- |
| Refresh Token | httpOnly Cookie              | 7天      | 高       | 获取新的 Access Token |
| Access Token  | Zustand Store (localStorage) | 15分钟   | 中       | API 请求认证          |
| User Info     | React Query Cache            | 5-10分钟 | 低       | 用户数据缓存          |
| Permissions   | React Query Cache            | 10分钟   | 中       | 权限数据缓存          |

### 2.2 请求架构

```
前端请求
    ├── 认证操作 (fetch)
    │   ├── /api/proxy/auth/login   (登录)
    │   ├── /api/proxy/auth/logout  (登出)
    │   └── /api/proxy/auth/refresh       (刷新token)
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

### 3.2 useAuth Hook

### 3.3 Next.js 代理 API

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

### 3.4 Axios 拦截器设计

```typescript
// lib/api/request.ts
// 请求拦截器 - 自动添加 token
api.interceptors.request.use()

// 响应拦截器 - 自动刷新 token
api.interceptors.response.use()
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

## 4. 使用指南

### 4.1 开发者使用

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
