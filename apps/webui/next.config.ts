//@ts-check

import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'
import { composePlugins, withNx } from '@nx/next'

const nextConfig: NextConfig = {
  // Enable Cache Components for advanced caching strategies
  experimental: {
    cacheComponents: true,
  },
  rewrites: async () => [
    { source: '/health', destination: '/api/health' },
    { source: '/ping', destination: '/api/health' },
  ],
}

const plugins = [withNx, withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })]

module.exports = composePlugins(...plugins)(nextConfig)
