import type { Config } from 'jest'

const { pathsToModuleNameMapper } = require('ts-jest')
const { compilerOptions } = require('./tsconfig.json')

const config: Config = {
  displayName: '@xueji/webui',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  moduleNameMapper: {
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
    // 处理 Next.js 特殊模块（如 next/font）
    'next/font': require.resolve('next/dist/build/jest/__mocks__/nextFontMock.js'),
  },
  coverageDirectory: 'test-output/jest/coverage',
}

export default config
