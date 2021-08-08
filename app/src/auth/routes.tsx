import { RouteConfig } from '~/shared/typings/global'
import { paths } from '../shared/paths'
import { Login } from './views/login'

export const routes: RouteConfig[] = [
  {
    path: paths.auth.login(),
    Component: Login,
    layout: 'without-navigation',
    exact: true,
  },
]
