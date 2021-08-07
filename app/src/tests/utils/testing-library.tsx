import React from 'react'
import { render, RenderResult } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import createCache from '@emotion/cache'
import { ChakraProvider, StorageManager } from '@chakra-ui/react'
import { Switch } from 'react-router-dom'
import { CookiesProvider } from 'react-cookie'
import Cookies from 'universal-cookie'
import { MockedProvider } from '@apollo/client/testing'
import { InMemoryCache } from '@apollo/client'
import { AppProviders } from '~/shared/app-providers'
import { theme } from '~/shared/theme'
import { DynamicColorMode } from '~/shared/theme/DynamicColorMode'
import { memoryColorModeManager } from './chakra'

export const history = createMemoryHistory()
export const emotionCache = createCache({ key: 'gc' })
export const cookies = new Cookies()

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
    <MockedProvider cache={cache} mocks={mocks}>
      <AppProviders cache={emotionCache}>
        <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
          <CookiesProvider cookies={cookies}>
            <DynamicColorMode>
              <Switch>{children}</Switch>
            </DynamicColorMode>
          </CookiesProvider>
        </ChakraProvider>
      </AppProviders>
    </MockedProvider>
  )

  return render(ui, { wrapper })
}

export { default as userEvent } from '@testing-library/user-event'
export * from '@testing-library/react'
export { testRender as render }
