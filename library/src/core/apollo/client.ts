import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'
import Cookies from 'universal-cookie'

import { isServerSide } from '../helpers'
import { cache } from './cache'
import { csrfLink } from './csrf'
import { retry } from './retry'

let client: ApolloClient<NormalizedCacheObject>

export function createApolloClient(
  cookies: string | undefined = typeof document !== 'undefined'
    ? document.cookie
    : undefined
) {
  if (!isServerSide() && client) return client

  const headers: Record<string, string> = {}

  if (cookies) {
    const csrf = decodeURIComponent(new Cookies(cookies).get('csrf'))
    headers.cookie = cookies
    headers['X-CSRF-Token'] = csrf
    console.log('xsrf token', csrf)
  }

  client = new ApolloClient({
    cache,
    ssrMode: isServerSide(),
    link: ApolloLink.from([
      retry,
      csrfLink,
      createHttpLink({
        uri: 'http://localhost:3000/graphql',
        credentials: 'include',
        headers,
      }),
    ]),
  })

  return client
}
