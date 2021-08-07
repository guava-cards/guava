import { InMemoryCache } from '@apollo/client'
import { CachePersistor, LocalForageWrapper } from 'apollo3-cache-persist'
import localforage from 'localforage'
import { env } from '../env'
import introspectionResult from '../../generated/introspection-result'
import { isServerSide } from '../helpers'

declare let window: Window & {
  __APOLLO_STATE__: Record<string, any>
}

export const cacheForage = localforage.createInstance({
  driver: localforage.INDEXEDDB,
  name: '_gc_cache',
})

export const storage = new LocalForageWrapper(cacheForage)

export const cache = new InMemoryCache({
  possibleTypes: introspectionResult.possibleTypes,
})

if (!isServerSide()) {
  const { __APOLLO_STATE__: initialState } = window
  cache.restore(initialState)
}

export const persistor = new CachePersistor({
  cache,
  storage: storage as never,
  key: '_gc_cache',
  debug: env.DEV,
})

export const restoreCache = () => persistor.restore()
export const purgeCache = () => persistor.purge()
