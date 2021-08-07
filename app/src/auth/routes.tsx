import { RouteConfig } from '~/shared/typings/global'
import { paths } from '../shared/paths'

export const routes: RouteConfig[] = [
  {
    path: paths.auth.login(),
    importComponent: () => import('./views/login').then(mod => mod.Login),
    layout: 'without-navigation',
    exact: true,
  },
]
