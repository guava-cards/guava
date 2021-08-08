import { Fragment } from 'react'
import { ViewLayout } from '../typings'
import { DashboardLayout } from './dashboard'

export const LayoutComponentMap: Record<ViewLayout, React.ComponentType> = {
  marketing: Fragment,
  'with-dashboard-sidebar': DashboardLayout,
  'without-navigation': Fragment,
}

const LayoutFor = (kind: ViewLayout) => LayoutComponentMap[kind]
export function wrapInLayout<Props = unknown>(
  Component: React.ComponentType,
  kind: ViewLayout,
  props?: Props
) {
  const LayoutComponent = LayoutFor(kind)
  return (
    <LayoutComponent {...(props as never)}>
      <Component />
    </LayoutComponent>
  )
}

export { LayoutFor, DashboardLayout }
