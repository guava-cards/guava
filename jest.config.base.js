/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = {
  verbose: process.env.NODE_ENV !== 'development',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'd.ts'],
  roots: ['<rootDir>'],
  transform: {
    '\\.[jt]sx?$': [
      'babel-jest',
      {
        rootMode: 'upward',
        configFile: path.resolve(__dirname, 'babel.config.js'),
      },
    ],
    '.+\\.(css|styl|less|svg(?!component)|less|sass|scss|png|jpg|jpeg|gif|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  setupFilesAfterEnv: [path.join(__dirname, 'jest.setup.js')],
  collectCoverageFrom: [
    '!**/*.d.ts',
    '!**/*.config.*',
    '!**/generated/**/*',
    '!**/tests/**/*',
    '!**/__tests__/**/*',
    '!**/spec/**/*',
  ],
}
