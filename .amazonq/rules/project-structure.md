# 学记助理项目结构规则

## 项目架构

这是一个基于 Nx monorepo 的 Next.js 16 项目，采用以下架构：

### 目录结构

- `apps/` - 应用程序
  - `webui/` - 主要的 Next.js 16 Web 应用
  - `demo/` - 演示应用
  - `*-e2e/` - E2E 测试应用
- `libs/` - 共享库
  - `ui/` - UI 组件库（包含 Storybook）
  - `utils/` - 工具函数库
- `docs/` - 项目文档
- `tools/` - 构建和开发工具

### 技术栈约束

- **框架**: Next.js 16 (App Router 模式)
- **React**: 19.2.0+
- **TypeScript**: 严格模式，ES2022 目标
- **样式**: Tailwind CSS v4 + Material UI
- **状态管理**: Zustand
- **包管理**: pnpm (workspace 模式)
- **构建工具**: Nx 22.0.1
- **代码质量**: ESLint 9 + Prettier

## 代码组织规则

### 1. 文件命名

- 组件文件使用 PascalCase: `MyComponent.tsx`
- 页面文件使用 kebab-case: `cache-demo/page.tsx`
- 工具函数使用 camelCase: `utils.ts`
- 配置文件使用标准命名: `next.config.ts`, `eslint.config.mjs`

### 2. 组件路径规范

#### 全局组件 (`libs/ui/`)

```
libs/ui/src/components/
├── Button/
│   ├── index.ts          # 导出文件
│   ├── Button.tsx        # 主组件
│   ├── Button.stories.tsx # Storybook 故事
│   └── Button.spec.tsx   # 测试文件
```

#### 应用级组件 (`apps/webui/src/components/`)

```
apps/webui/src/components/
├── Layout/
│   ├── Header.tsx
│   └── Sidebar.tsx
└── Forms/
    ├── LoginForm.tsx
    └── ContactForm.tsx
```

#### 页面级组件 (`app/route/_components/`)

```
app/person/
├── _components/          # 页面专用组件
│   ├── PersonCard.tsx
│   ├── PersonList.tsx
│   └── PersonForm.tsx
├── [id]/
│   ├── _components/      # 子路由专用组件
│   │   └── PersonDetail.tsx
│   └── page.tsx
└── page.tsx
```

#### 组件导入优先级

1. **页面级组件**: `'./_components/ComponentName'`
2. **应用级组件**: `'@/components/ComponentName'`
3. **全局组件**: `'@xueji/ui'`
4. **第三方组件**: `'@mui/material'`

### 3. 导入顺序

使用 `@ianvs/prettier-plugin-sort-imports` 自动排序：

1. React 相关
2. 第三方库
3. 内部库 (`@xueji/*`)
4. 相对路径导入

### 4. 组件结构

```
src/app/components/
├── ComponentName/
│   ├── index.ts          # 导出文件
│   ├── ComponentName.tsx # 主组件
│   ├── ComponentName.stories.tsx # Storybook 故事
│   └── ComponentName.spec.tsx    # 测试文件
```

### 5. 库结构

- `libs/ui/` - 可复用 UI 组件，包含 Storybook
- `libs/utils/` - 纯函数工具库
- 每个库必须有 `package.json`, `tsconfig.json`, `README.md`

## Next.js 16 特性使用

### Cache Components

- 启用 `experimental.cacheComponents: true`
- 使用 `'use cache'` 指令缓存组件
- 配合 `cacheLife()` 和 `cacheTag()` 进行缓存管理
- 所有缓存组件必须包装在 Suspense 边界内

### App Router

- 使用 `app/` 目录结构
- 页面文件命名: `page.tsx`
- 布局文件命名: `layout.tsx`
- API 路由: `route.ts`

## 开发规范

### 1. 提交规范

遵循 Conventional Commits:

```
feat(scope): 描述
fix(scope): 描述
docs(scope): 描述
```

### 2. 代码质量

- 所有代码必须通过 ESLint 检查
- 使用 Prettier 自动格式化
- TypeScript 严格模式，无 `any` 类型
- 组件必须有 PropTypes 或 TypeScript 接口

### 3. 测试要求

- 组件库必须有单元测试 (Jest)
- 应用必须有 E2E 测试 (Playwright)
- 测试覆盖率要求 > 80%

### 4. 性能优化

- 使用 Next.js 16 Cache Components
- 图片使用 `next/image` 组件
- 动态导入大型组件
- 启用 Bundle Analyzer 分析包大小

## 环境配置

### 开发环境

```bash
nx dev webui --turbo  # 启动开发服务器
nx test ui           # 运行单元测试
nx e2e webui-e2e     # 运行 E2E 测试
nx storybook ui      # 启动 Storybook
```

### 构建部署

```bash
nx build webui       # 构建生产版本
nx analyze webui     # 分析包大小
```

## 依赖管理

### 内部依赖

- 应用可以依赖 `@xueji/ui` 和 `@xueji/utils`
- 库之间避免循环依赖
- 使用 workspace 协议: `"@xueji/ui": "workspace:*"`

### 外部依赖

- 优先使用项目已有的依赖
- 新增依赖需要考虑包大小和维护性
- 关键依赖版本锁定

## 安全规范

- 环境变量使用 `.env.local` (不提交到版本控制)
- API 密钥等敏感信息使用环境变量
- 客户端代码中不包含服务端密钥
- 使用 Next.js 内置的 CSRF 保护
