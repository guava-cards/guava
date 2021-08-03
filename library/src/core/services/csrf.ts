import Cookies from 'universal-cookie'

export function getCsrfToken() {
  const cookies = new Cookies()
  const csrfTokenKey = 'csrf_token'
  return cookies.get(csrfTokenKey)
}
