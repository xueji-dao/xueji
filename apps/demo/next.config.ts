import type { NextConfig } from 'next'
import { composePlugins, withNx } from '@nx/next'

const nextConfig: NextConfig = {
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {
    svgr: false,
  },
  rewrites: async () => [
    { source: '/health', destination: '/api/health' },
    { source: '/ping', destination: '/api/health' },
  ],
}

const plugins = [withNx]

module.exports = composePlugins(...plugins)(nextConfig)
