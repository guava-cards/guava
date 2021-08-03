/* eslint-disable no-underscore-dangle */
import { refocusExchange } from '@urql/exchange-refocus'
import { retryExchange } from '@urql/exchange-retry'
import { createClient, fetchExchange, dedupExchange, ssrExchange } from 'urql'
import { isServerSide } from '../helpers'
import { cache } from './cache'
import { getCsrfToken } from './csrf'

interface UrqlWindow extends Window {
  __URQL_DATA__: Record<string, any>
}

declare let window: UrqlWindow

const fetchOptions = (): RequestInit => ({
  headers: {
    'X-CSRF-Token': getCsrfToken(),
    Accept: 'application/json',
  },
  credentials: 'same-origin',
})

export const urqlSsr = ssrExchange({
  isClient: !isServerSide(),
  initialState: !isServerSide() ? window.__URQL_DATA__ : undefined,
})

export const urqlClient = createClient({
  url: 'http://localhost:3000/graphql',
  suspense: true,
  exchanges: [
    dedupExchange,
    retryExchange({}),
    refocusExchange(),
    cache,
    urqlSsr,
    fetchExchange,
  ],
  fetchOptions,
})
