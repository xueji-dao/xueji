# 文档注释规范

## JSDoc 注释规范

### 组件注释

```typescript
/**
 * 组件简要描述 - 功能说明
 *
 * @example
 * 基础用法
 * <ComponentName prop="value">
 *   内容
 * </ComponentName>
 *
 * @example
 * 高级用法
 * <ComponentName
 *   prop1="value1"
 *   prop2="value2"
 *   onEvent={() => {}}
 * >
 *   复杂内容
 * </ComponentName>
 */
interface ComponentProps {
  /** 属性描述 */
  prop: string
  /** 可选属性描述 */
  optionalProp?: boolean
  /** 回调函数描述 */
  onEvent?: (data: any) => void
}
```

### 函数注释

```typescript
/**
 * 函数功能描述
 *
 * @param param1 - 参数1描述
 * @param param2 - 参数2描述
 * @returns 返回值描述
 *
 * @example
 * const result = functionName('value1', true)
 * console.log(result) // 输出结果
 */
export function functionName(param1: string, param2: boolean): ReturnType {
  // 实现
}
```

### Hook 注释

```typescript
/**
 * Hook 功能描述
 *
 * @param config - 配置参数
 * @returns Hook 返回值对象
 *
 * @example
 * const { data, loading, error } = useCustomHook({
 *   enabled: true,
 *   refetchInterval: 5000
 * })
 */
export const useCustomHook = (config: Config) => {
  // Hook 实现
}
```

### API 函数注释

```typescript
/**
 * API 调用函数描述
 *
 * @param params - 请求参数
 * @returns Promise<响应数据类型>
 * @throws {Error} 错误情况描述
 *
 * @example
 * try {
 *   const user = await fetchUser({ id: '123' })
 *   console.log(user.name)
 * } catch (error) {
 *   console.error('获取用户失败:', error.message)
 * }
 */
export async function fetchUser(params: UserParams): Promise<User> {
  // API 实现
}
```

## 内联注释规范

### 业务逻辑注释

```typescript
// ✅ 解释为什么这样做
// 使用防抖避免频繁请求，提升用户体验
const debouncedSearch = useMemo(
  () => debounce(handleSearch, 300),
  [handleSearch]
)

// ✅ 解释复杂的业务规则
// 管理员用户或者拥有特殊权限的用户可以访问
if (user.role === 'admin' || user.permissions.includes('special:access')) {
  // 允许访问
}

// ❌ 避免显而易见的注释
// 设置用户名
setUsername(newUsername)
```

### TODO 注释

```typescript
// TODO: 实现缓存机制提升性能
// TODO(张三): 添加错误重试逻辑
// FIXME: 修复在 Safari 中的兼容性问题
// HACK: 临时解决方案，等待后端 API 修复
```

### 代码块注释

```typescript
export const useAuth = () => {
  // 1. 状态管理
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // 2. 认证检查
  const checkAuth = useCallback(async () => {
    try {
      const token = getStoredToken()
      if (!token) return false
      
      // 验证 token 有效性
      const userData = await validateToken(token)
      setUser(userData)
      return true
    } catch (error) {
      // 清理无效认证状态
      clearAuthData()
      return false
    }
  }, [])

  // 3. 返回接口
  return { user, loading, checkAuth }
}
```

## 类型注释规范

### 接口定义

```typescript
/**
 * 用户信息接口
 */
interface User {
  /** 用户唯一标识 */
  id: string
  /** 用户名 */
  username: string
  /** 邮箱地址 */
  email?: string
  /** 用户角色列表 */
  roles: string[]
  /** 创建时间 */
  createdAt: Date
  /** 最后更新时间 */
  updatedAt: Date
}

/**
 * API 响应基础结构
 */
interface ApiResponse<T = any> {
  /** 响应状态码 */
  code: number
  /** 响应消息 */
  message: string
  /** 响应数据 */
  data: T
  /** 请求时间戳 */
  timestamp: number
}
```

### 复杂类型注释

```typescript
/**
 * 权限配置类型
 * 
 * @example
 * const config: PermissionConfig = {
 *   roles: ['admin', 'user'],
 *   permissions: ['read', 'write'],
 *   mode: 'strict'
 * }
 */
type PermissionConfig = {
  /** 允许的角色列表 */
  roles: string[]
  /** 需要的权限列表 */
  permissions: string[]
  /** 检查模式: 'loose' 任一满足 | 'strict' 全部满足 */
  mode: 'loose' | 'strict'
}
```

## 文件头注释

```typescript
/**
 * @fileoverview 用户认证相关工具函数
 * @author 开发者姓名
 * @since 2024-01-01
 */

/**
 * @fileoverview React 权限保护组件
 * @description 提供基于角色和权限的内容访问控制
 * @author 开发团队
 * @since 2024-01-01
 */
```

## 注释最佳实践

### 必须添加注释的情况

1. **公共 API** - 所有导出的函数、组件、Hook
2. **复杂业务逻辑** - 算法、业务规则、状态转换
3. **性能优化代码** - useMemo、useCallback 的使用原因
4. **临时解决方案** - HACK、FIXME 标记
5. **外部依赖** - 第三方库的特殊用法

### 避免的注释

1. **显而易见的操作** - `// 设置状态`
2. **重复代码内容** - `// 调用 fetchUser 函数`
3. **过时的注释** - 代码已修改但注释未更新
4. **无意义的注释** - `// 这里是一个函数`

### 注释维护

1. **代码修改时同步更新注释**
2. **定期检查注释的准确性**
3. **删除无用的注释**
4. **保持注释的简洁性**

## 多语言注释

```typescript
/**
 * 用户登录函数
 * User login function
 *
 * @param credentials - 登录凭据 / Login credentials
 * @returns Promise<登录结果> / Promise<Login result>
 */
export async function login(credentials: LoginCredentials): Promise<LoginResult> {
  // 验证输入参数 / Validate input parameters
  if (!credentials.username || !credentials.password) {
    throw new Error('用户名和密码不能为空 / Username and password are required')
  }
  
  // 调用认证 API / Call authentication API
  return await authApi.login(credentials)
}
```
