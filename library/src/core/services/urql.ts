import { refocusExchange } from '@urql/exchange-refocus'
import { retryExchange } from '@urql/exchange-retry'
import { createClient, fetchExchange, dedupExchange } from 'urql'
import { cache } from './cache'
import { getCsrfToken } from './csrf'

const fetchOptions = (): RequestInit => ({
  headers: {
    'X-CSRF-Token': getCsrfToken(),
    Accept: 'application/json',
  },
  credentials: 'same-origin',
})

export const urqlClient = createClient({
  url: 'http://localhost:3000/graphql',
  suspense: true,
  exchanges: [
    cache,
    retryExchange({}),
    refocusExchange(),
    fetchExchange,
    dedupExchange,
  ],
  fetchOptions,
})
