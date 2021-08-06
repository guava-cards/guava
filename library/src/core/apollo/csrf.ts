import { ApolloLink } from '@apollo/client'
import Cookies from 'universal-cookie'

export const csrfLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {
    const {
      response: { headers },
    } = operation.getContext()

    if (headers.csrf_token) {
      new Cookies().set('csrf_token', headers.csrf_token)
    }

    return response
  })
)
