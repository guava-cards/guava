import { authExchange } from '@urql/exchange-auth'
import Cookies from 'universal-cookie'

export const createAuthExchange = (
  getNewAuthToken?: () => Promise<string | null | undefined>,
  cookies?: string
) => {
  const exchange = authExchange<{ token: string | null }>({
    addAuthToOperation({ authState, operation }) {
      if (!authState || !authState.token) {
        return operation
      }

      const fetchOptions =
        typeof operation.context.fetchOptions === 'function'
          ? operation.context.fetchOptions()
          : operation.context.fetchOptions || {}

      return {
        ...operation,
        context: {
          ...operation.context,
          fetchOptions: {
            ...fetchOptions,
            headers: {
              ...fetchOptions.headers,
              Authorization: `Bearer ${authState.token}`,
            },
          },
        },
      }
    },

    async getAuth({ authState }) {
      if (!authState) {
        const token = new Cookies(cookies).get('idToken')
        if (token) return { token }
      }

      const token = await getNewAuthToken?.()
      if (token) return { token }

      // sign out user

      return null
    },
  })

  return exchange
}
