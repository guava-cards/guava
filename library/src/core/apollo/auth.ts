import { setContext } from '@apollo/client/link/context'

export const createAuthLink = (
  getAuthToken: () => Promise<string | null | undefined>
) => {
  const authLink = setContext(async (_, { headers }) => {
    const idToken = await getAuthToken()
    console.log(idToken)
    return {
      headers: {
        ...headers,
        Authorization: idToken ? `Bearer ${idToken}` : undefined,
      },
    }
  })

  return authLink
}
