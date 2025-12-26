import type { NextConfig } from 'next'
import { composePlugins, withNx } from '@nx/next'
import withSerwistInit from '@serwist/next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/request.ts')

const withSerwist = withSerwistInit({
  swSrc: 'src/app/sw.ts',
  swDest: 'public/sw.js',
  disable: process.env.NODE_ENV !== 'production', // 开发环境禁用
})

const nextConfig: NextConfig = {
  // See: https://nx.dev/recipes/next/next-config-setup
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  cacheComponents: true,
  experimental: {
    mdxRs: true,
  },
  compiler: {
    // Remove properties matching the default regex ^data-test
    // Or, specify a custom list of regular expressions to match properties to remove.
    // The regexes defined here are processed in Rust so the syntax is different from
    // JavaScript `RegExp`s. See https://docs.rs/regex.
    // reactRemoveProperties: { properties: ['^data-custom$'] },
    // https://nextjs.org/docs/architecture/nextjs-compiler#remove-react-properties
    reactRemoveProperties: true,

    // Remove `console.*` output except `console.error`
    // removeConsole: {
    //   exclude: ['error'],
    // },
    emotion: true,
  },
  images: {
    localPatterns: [
      {
        pathname: '/images/**',
        search: '',
      },
      {
        pathname: '/blog/**',
        search: '',
      },
      {
        pathname: '/icons/**',
        search: '',
      },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'assets.vercel.com',
      },
    ],
  },
  rewrites: async () => [
    { source: '/posts', destination: '/blog' },
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
        source: '/news/:id',
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

const plugins = [withNx, withNextIntl, withSerwist]

export default composePlugins(...plugins)(nextConfig)
