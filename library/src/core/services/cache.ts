import { offlineExchange } from '@urql/exchange-graphcache'
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage'
import introspection from '../../generated/introspection'

const storage = makeDefaultStorage({
  idbName: 'graphcache-v3',
  maxAge: 30,
})

export const cache = offlineExchange({
  storage,
  schema: introspection,
  updates: {},
  optimistic: {},
})
