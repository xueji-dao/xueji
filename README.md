# 学记助理 WebUI

## 技术选型

- [Nx](https://github.com/nrwl/nx) - 基于插件的[单一代码库构建管理系统](./docs/nx.md)。
- [Next.js](https://nextjs.org/) - 开发框架，采用 [App Router 模式](./docs/nextjs.md)
- [Prisma ORM](https://www.prisma.io/): 支持多数据库的 Node.js and TypeScript ORM
- [Material UI](https://github.com/mui/material-ui) - 组件库
- [Tailwindcss](https://github.com/tailwindlabs/tailwindcss) - 原子化 CSS 样式方案
- [Typescript](https://github.com/Microsoft/TypeScript) - 基于 Javascript 的编程语言
- [react-three-fiber](https://github.com/pmndrs/react-three-fiber) - Three.js 组件
- [tunnel-rat](https://github.com/pmndrs/tunnel-rat) 挖掘隧道，让 React 元素可以渲染进 @react-three/fiber
- [framer-motion](https://github.com/framer/motion) - 动画手势库
- [Apollo Client](https://github.com/apollographql/apollo-client) - **GraphQL** 客户端
- [Zustand](https://zustand.docs.pmnd.rs) - 状态管理框架
- [lexical](https://lexical.dev/) - 一个可扩展的文本编辑器框架
- [Next Auth](https://github.com/nextauthjs/next-auth) - Web 认证
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)- 基于 GraphQL Schema 生成代码的工具
- [icons-react](https://github.com/tabler/tabler-icons/tree/main/packages/icons-react)-Tabler Icons for React
- 其他: jest eslint commitlint prettier WebAssembly WebWorker semantic-release

## 开发

```sh
nx dev webui --turbo
```

## 提交规范

```sh
feat(api)!: send an email to the customer when a product is shipped

BREAKING CHANGE: use JavaScript features not available in Node 6.
```

<https://www.conventionalcommits.org/en/v1.0.0/>

## 版本发布

| 提交类型           | 版本升级 | 触发条件                                                  |
| ------------------ | -------- | --------------------------------------------------------- |
| BREAKING CHANGE    | major    | 提交消息中包含破坏性变更描述                              |
| feat:              | minor    | 新增功能（即使手动 tag 是 v2.0.0，新 feat 会生成 v2.1.0） |
| fix:               | patch    | 问题修复                                                  |
| perf:/docs:/chore: | 无变化   | 除非包含 BREAKING CHANGE，否则不会触发版本升级            |
