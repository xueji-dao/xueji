/**
 * 全局配置文件，统一管理应用的所有配置项
 *
 * 优势：
 * - 类型安全：TypeScript 自动推断和检查
 * - 智能提示：IDE 提供完整的属性提示
 * - 默认值管理：统一处理环境变量缺失情况
 * - 配置验证：可以添加运行时验证逻辑
 * - 代码可读性
 * - 重构友好
 */

import { paths } from '@/routes/paths'

import packageJson from '../package.json'

export const CONFIG = {
  appName: '学记智能',
  appVersion: packageJson.version,

  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? '',
  assetsUrl: process.env.NEXT_PUBLIC_ASSETS_URL ?? '',

  /**
   * Auth
   * @method jwt | amplify | firebase | supabase | auth0
   */
  auth: {
    method: 'jwt',
    skip: false,
    redirectPath: paths.workspace.root || process.env.NEXT_PUBLIC_AUTH_REDIRECT_PATH,
  },
  site: {
    url: 'https://xuejiai.com',
    ogImageUrl: 'https://xuejiai.com/images/cover.png',
  },
  paths: {
    posts: 'https://github.com/XueJi-DAO/xueji/tree/main/apps/xueji/posts',
  },

  /**
   * Firebase
   */
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? '',
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? '',
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? '',
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? '',
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? '',
    appId: process.env.NEXT_PUBLIC_FIREBASE_APPID ?? '',
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID ?? '',
  },

  /**
   * Neo4j Database
   */
  neo4j: {
    uri: process.env.NEO4J_URI ?? '',
    user: process.env.NEO4J_USER ?? '',
    password: process.env.NEO4J_PASSWORD ?? '',
  },

  /**
   * Stripe Payment
   */
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
    secretKey: process.env.STRIPE_SECRET_KEY ?? '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
    paymentDescription: process.env.STRIPE_PAYMENT_DESCRIPTION ?? 'Software development services',
  },
} as const
