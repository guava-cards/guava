import { offlineExchange } from '@urql/exchange-graphcache'
import { makeDefaultStorage } from '@urql/exchange-graphcache/default-storage'
import introspection from '../../generated/introspection'
import { isServerSide } from '../helpers'

const storage = !isServerSide()
  ? makeDefaultStorage({
      idbName: 'graphcache-v3',
      maxAge: 30,
    })
  : undefined

export const cache = offlineExchange({
  storage,
  schema: introspection,
  updates: {},
  optimistic: {},
})
