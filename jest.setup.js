/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */

const fetchMock = require('jest-fetch-mock')
const { toHaveNoViolations } = require('jest-axe')

expect.extend(toHaveNoViolations)
fetchMock.enableMocks()

if (typeof window !== 'undefined') {
  require('@testing-library/jest-dom')

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  })
}

// https://github.com/testing-library/react-testing-library/issues/459
// Supress act warning. TODO: Fix issue without supression

const originalError = console.error
const originalWarn = console.warn

beforeAll(() => {
  // this is here to silence a warning temporarily
  // we'll fix it in the next exercise
  jest.spyOn(console, 'warn').mockImplementation((...args) => {
    if (
      typeof args[0] === 'string' &&
      (args[0].includes('Warning: <Formik render>') ||
        args[0].includes('Warning: componentWillMount'))
    ) {
      return
    }
    originalWarn.call(console, ...args)
  })
  jest.spyOn(console, 'error').mockImplementation((...args) => {
    if (
      // eslint-disable-next-line operator-linebreak
      typeof args[0] === 'string' &&
      args[0].includes('Warning: An update to')
    ) {
      return
    }
    originalError.call(console, ...args)
  })
})

afterAll(() => {
  if ('mockRestore' in console.error) {
    console.error.mockRestore()
  }
})
