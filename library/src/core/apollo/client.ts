import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  NormalizedCacheObject,
} from '@apollo/client'

import { isServerSide } from '../helpers'
import { createAuthLink } from './auth'
import { cache } from './cache'
import { retry } from './retry'

let client: ApolloClient<NormalizedCacheObject>
export interface CreateApolloClientConfig {
  getAuthToken: () => Promise<string | null | undefined>
}

export function createApolloClient({ getAuthToken }: CreateApolloClientConfig) {
  if (!isServerSide() && client) return client

  client = new ApolloClient({
    cache,
    ssrMode: isServerSide(),
    link: ApolloLink.from([
      retry,
      createAuthLink(getAuthToken),
      createHttpLink({
        uri: 'http://localhost:3000/graphql',
      }),
    ]),
  })

  return client
}
