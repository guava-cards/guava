import Cookies from 'universal-cookie'
import { isServerSide } from '../helpers'

export function getCsrfToken(cookiesStr?: string) {
  const cookies = new Cookies(isServerSide() ? cookiesStr : document.cookie)
  const csrfTokenKey = 'csrf_token'
  return cookies.get(csrfTokenKey)
}
