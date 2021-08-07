/* eslint-disable @typescript-eslint/no-var-requires */
const baseConfig = require('../jest.config.base')

module.exports = {
  ...baseConfig,
  roots: ['<rootDir>'],
  displayName: 'App',
  name: 'app',
  setupFilesAfterEnv: [
    ...(baseConfig.setupFilesAfterEnv || []),
    '<rootDir>/src/tests/setup.ts',
  ],
  moduleNameMapper: {
    '^~(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [...baseConfig.collectCoverageFrom, '!src/main.tsx'],
}
