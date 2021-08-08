/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const CracoEsbuildPlugin = require('craco-esbuild')
const path = require('path')
const { ProvidePlugin } = require('webpack')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const eslintConfig = require('../.eslintrc.js')
const baseJestConfig = require('../jest.config.base')

module.exports = {
  plugins: [
    {
      plugin: CracoEsbuildPlugin,
      options: {
        includePaths: [path.join(__dirname, '..', 'library')],
        enableSvgr: true,
        esbuildLoaderOptions: {
          loader: 'tsx',
          target: 'es2015',
        },
        skipEsbuildJest: true,
      },
    },
  ],

  babel: {
    presets: ['@emotion/babel-preset-css-prop'],
    plugins: ['@emotion'],
  },

  typescript: {
    enableTypeChecking: true,
  },

  eslint: {
    enable: true,
    configure: eslintConfig,
  },

  webpack: {
    plugins: {
      add: [
        process.env.ANALYZE && new BundleAnalyzerPlugin(),
        new ProvidePlugin({
          React: 'react',
        }),
      ].filter(Boolean),
    },
    alias: {
      '~': path.join(__dirname, 'src'),
    },
  },

  jest: {
    configure: {
      displayName: 'App',
      name: 'app',
      setupFilesAfterEnv: [
        ...(baseJestConfig.setupFilesAfterEnv || []),
        '<rootDir>/src/tests/setup.ts',
      ],
      moduleNameMapper: {
        '^~(.*)$': '<rootDir>/src/$1',
      },
      collectCoverageFrom: [
        ...baseJestConfig.collectCoverageFrom,
        '!src/main.tsx',
      ],
    },
  },
}
