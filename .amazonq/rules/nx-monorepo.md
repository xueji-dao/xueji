# Nx Monorepo 规则

## 项目结构约束

### 应用 (apps/)

- `webui/` - 主要的 Next.js 16 Web 应用
- `demo/` - 演示和测试应用
- `*-e2e/` - 对应应用的 E2E 测试

### 库 (libs/)

- `ui/` - 可复用的 UI 组件库
- `utils/` - 纯函数工具库
- 每个库必须是独立可构建的

## 依赖规则

### 模块边界

```typescript
// apps/ 可以依赖 libs/
import { Button } from '@xueji/ui'
import { formatDate } from '@xueji/utils'

// libs/ 之间避免循环依赖
// ✅ utils 可以被 ui 依赖
// ❌ ui 不应该依赖其他 libs
```

### 标签系统

- 应用标签: `type:app`
- 库标签: `type:lib`
- 功能标签: `scope:ui`, `scope:utils`

## Nx 命令规范

### 开发命令

```bash
# 启动开发服务器
nx dev webui

# 启动 Storybook
nx storybook ui

# 运行测试
nx test ui
nx e2e webui-e2e
```

### 构建命令

```bash
# 构建单个应用
nx build webui

# 构建所有项目
nx run-many -t build

# 构建受影响的项目
nx affected -t build
```

### 代码质量

```bash
# 代码检查
nx lint webui
nx run-many -t lint

# 类型检查
nx typecheck webui
```

## 生成器使用

### 创建新组件

```bash
# 在 UI 库中创建组件
nx g @nx/react:component MyComponent --project=ui --export

# 在应用中创建页面组件
nx g @nx/next:component MyPage --project=webui
```

### 创建新库

```bash
# 创建 React 组件库
nx g @nx/react:library my-lib --bundler=vite --unitTestRunner=jest

# 创建工具库
nx g @nx/js:library my-utils --bundler=tsc
```

## 缓存策略

### 构建缓存

- 启用 Nx Cloud 分布式缓存
- 本地缓存存储在 `.nx/cache/`
- 缓存键基于输入文件和依赖

### 缓存配置

```json
{
  "targetDefaults": {
    "build": {
      "cache": true,
      "inputs": ["production", "^production"]
    },
    "test": {
      "cache": true,
      "inputs": ["default", "^production"]
    }
  }
}
```

## 工作空间配置

### 包管理

- 使用 pnpm workspace
- 依赖提升到根目录
- 内部包使用 `workspace:*` 协议

### TypeScript 配置

- 基础配置在 `tsconfig.base.json`
- 项目特定配置继承基础配置
- 路径映射统一管理

```json
{
  "compilerOptions": {
    "paths": {
      "@xueji/ui": ["libs/ui/src/index.ts"],
      "@xueji/utils": ["libs/utils/src/index.ts"]
    }
  }
}
```

## 发布策略

### 版本管理

- 使用 semantic-release 自动发布
- 基于 conventional commits 确定版本
- 统一版本号管理

### 构建产物

- 库构建为 ES modules
- 应用构建为静态资源
- 类型定义文件自动生成

## 最佳实践

### 项目组织

1. 按功能而非技术分层
2. 保持库的单一职责
3. 避免深层嵌套依赖

### 性能优化

1. 使用 `--turbo` 加速开发
2. 启用增量构建
3. 合理使用缓存策略

### 团队协作

1. 使用 affected 命令只测试变更
2. 配置 CI/CD 流水线
3. 代码审查关注依赖变更
