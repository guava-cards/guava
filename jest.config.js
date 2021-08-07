/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const baseConfig = require('./jest.config.base')

module.exports = {
  rootDir: '.',
  projects: ['<rootDir>/app', '<rootDir>/library'],
  collectCoverage: true,
  coverageReporters: ['json', 'html'],
  coverageDirectory: path.join(__dirname, 'coverage'),
  collectCoverageFrom: baseConfig.collectCoverageFrom,
}
