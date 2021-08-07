import { paths } from '~/shared/paths'
import { RouteConfig } from '~/shared/typings/global'

export const routes: RouteConfig[] = [
  {
    path: paths.decks.list,
    importComponent: () => import('./views/index').then(mod => mod.AllDecks),
    layout: 'with-dashboard-sidebar',
    exact: true,
    layoutProps: {
      withBreadcrumbs: true,
    },
    protected: true,
  },
  {
    path: paths.decks.detail(),
    importComponent: () => import('./views/show').then(mod => mod.DetailDeck),
    layout: 'with-dashboard-sidebar',
    protected: true,
    exact: true,
  },
]
