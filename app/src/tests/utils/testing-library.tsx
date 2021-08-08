import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import { ChakraProvider, StorageManager } from '@chakra-ui/react'
import { Switch, Router } from 'react-router-dom'
import { MockedProvider } from '@apollo/client/testing'
import { InMemoryCache } from '@apollo/client'
import { theme } from '~/shared/theme'
import { DynamicColorMode } from '~/shared/theme/DynamicColorMode'
import { memoryColorModeManager } from './chakra'

export const history = createMemoryHistory()

export interface TestRenderOptions {
  mocks?: MockedProvider['props']['mocks']
  cache?: InMemoryCache
  colorModeManager?: StorageManager
}

const testRender = (
  ui: React.ReactElement,
  { mocks, cache, colorModeManager }: TestRenderOptions = {
    mocks: [],
    colorModeManager: memoryColorModeManager(),
  }
): RenderResult => {
  const wrapper: React.FC = ({ children }) => (
    <Router history={history as never}>
      <MockedProvider cache={cache} mocks={mocks}>
        <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
          <DynamicColorMode>
            <Switch>{children}</Switch>
          </DynamicColorMode>
        </ChakraProvider>
      </MockedProvider>
    </Router>
  )

  return render(ui, { wrapper })
}

export { default as userEvent } from '@testing-library/user-event'
export * from '@testing-library/react'
export { testRender as render }
