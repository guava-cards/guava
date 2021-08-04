import Cookies from 'universal-cookie'

export function getCsrfToken(cookiesStr?: string) {
  const cookies = new Cookies(cookiesStr)
  const csrfTokenKey = 'csrf_token'
  return cookies.get(csrfTokenKey)
}
