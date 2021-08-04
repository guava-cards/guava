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
import { getCsrfToken } from './csrf'

interface UrqlWindow extends Window {
  __URQL_DATA__: Record<string, any>
}

declare let window: UrqlWindow
let client: Client

export const urqlSsr = ssrExchange({
  isClient: !isServerSide(),
  initialState: !isServerSide() ? window.__URQL_DATA__ : undefined,
})

export function createUrqlClient(cookies?: string) {
  const headers: RequestInit['headers'] = {
    Accept: 'application/json',
  }

  if (getCsrfToken(cookies)) {
    headers['X-CSRF-Token'] = getCsrfToken(cookies)
  }

  if (cookies) {
    headers.Cookie = cookies
  }

  const fetchOptions = (): RequestInit => ({
    headers: {
      ...headers,
      Accept: 'application/json',
    },
    credentials: 'include',
  })

  if (!isServerSide() && client) return client

  client = createClient({
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

  return client
}
