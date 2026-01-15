import path from 'node:path'
import { config } from 'dotenv'
import { defineConfig, env } from 'prisma/config'

// 手动加载 .env.local 文件
config({ path: '.env.local' })

export default defineConfig({
  schema: path.join('src/lib/prisma', 'schema.prisma'),
  migrations: {
    path: path.join('src/lib/prisma', 'migrations'),
    seed: 'pnpm dlx tsx src/lib/prisma/seed.ts',
  },
  views: {
    path: path.join('src/lib/prisma', 'views'),
  },
  typedSql: {
    path: path.join('src/lib/prisma', 'queries'),
  },
  engine: 'classic',
  datasource: {
    url: env('DATABASE_URL'),
  },
})
