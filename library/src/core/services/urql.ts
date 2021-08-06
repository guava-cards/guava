/* eslint-disable no-underscore-dangle */
import { refocusExchange } from '@urql/exchange-refocus'
import { retryExchange } from '@urql/exchange-retry'
import {
  createClient,
  fetchExchange,
  dedupExchange,
  ssrExchange,
  Client,
} from 'urql'
import { isServerSide } from '../helpers'
import { cache } from './cache'
import { createAuthExchange } from './auth'

interface UrqlWindow extends Window {
  __URQL_DATA__: Record<string, any>
}

interface CreateClientConfig {
  getNewAuthToken?: () => Promise<string | null | undefined>
  cookies?: string
}

declare let window: UrqlWindow
let client: Client

export const urqlSsr = ssrExchange({
  isClient: !isServerSide(),
  initialState: !isServerSide() ? window.__URQL_DATA__ : undefined,
})

export function createUrqlClient({
  getNewAuthToken,
  cookies,
}: CreateClientConfig) {
  if (client) return client

  client = createClient({
    url: 'http://localhost:3000/graphql',
    suspense: true,
    exchanges: [
      dedupExchange,
      retryExchange({}),
      refocusExchange(),
      cache as never,
      urqlSsr,
      createAuthExchange(getNewAuthToken, cookies),
      fetchExchange,
    ].filter(Boolean),
  })

  return client
}
