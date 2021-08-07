import superjson from 'superjson'
import {
  AuthenticationError,
  DomainError,
  NotFoundError,
} from '@guava/library/src'

superjson.registerClass(AuthenticationError)
superjson.registerClass(NotFoundError)
superjson.registerClass(DomainError)
superjson.registerClass(Error)

export const Page = ({ error: errorString }) => {
  const error = errorString
    ? superjson.parse<Error>(errorString)
    : new DomainError('An unknown error has ocurred', 'domain_error')

  return error.message
}
