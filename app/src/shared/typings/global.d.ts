declare type ViewLayout =
  | 'with-dashboard-sidebar'
  | 'without-navigation'
  | 'marketing'

declare interface RouteConfig {
  path: string
  exact?: boolean
  sensitive?: boolean
  strict?: string
  protected?: boolean
  Component?: React.ComponentType
  layout?: React.ComponentType | ViewLayout
  importComponent?: () => Promise<React.ComponentType>
}
