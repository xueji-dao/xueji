import type { NextConfig } from 'next'
import createMDXPlugin from '@next/mdx'
import { composePlugins, withNx } from '@nx/next'
import createNextIntlPlugin from 'next-intl/plugin'
import remarkMath from 'remark-math'

const withNextIntl = createNextIntlPlugin()
const withMDX = createMDXPlugin({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [],
  },
})

const nextConfig: NextConfig = {
  // See: https://nx.dev/recipes/next/next-config-setup
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  experimental: {
    mdxRs: true,
  },
  images: {
    localPatterns: [
      {
        pathname: '/api/image/**',
        search: '',
      },
      {
        pathname: '/images/**',
        search: '',
      },
      {
        pathname: '/blog/**',
        search: '',
      },
    ],
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
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
        port: '',
        pathname: '/image/upload/**',
        search: '',
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
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'X-About-Custom-Header',
            value: 'about_header_value',
          },
        ],
      },
      {
        source: '/demo/news/:id',
        headers: [
          {
            key: 'X-News-Custom-Header',
            value: 'news_header_value',
          },
        ],
      },
    ]
  },
}

const plugins = [withNx, withNextIntl, withMDX]

module.exports = composePlugins(...plugins)(nextConfig)
