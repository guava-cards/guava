import { AuthenticationError } from '@guava/library'
import { paths } from '../paths'

/**
 * Maps thrown domain errors to page redirects
 */
export function errorRedirects(error: Error): string | null {
  if (error instanceof AuthenticationError) {
    return error.redirectTo ?? paths.auth.login()
  }

  // No redirect, we should render something instead.
  return null
}
