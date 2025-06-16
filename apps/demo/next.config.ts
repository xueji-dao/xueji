import type { NextConfig } from 'next'
import { composePlugins, withNx } from '@nx/next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  // See: https://nx.dev/recipes/next/next-config-setup
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  nx: {
    svgr: false,
  },
  rewrites: async () => [
    { source: '/blog', destination: '/news' },
    { source: '/health', destination: '/api/health' },
    { source: '/ping', destination: '/api/health' },
  ],
}

const plugins = [withNx, withNextIntl]

module.exports = composePlugins(...plugins)(nextConfig)
