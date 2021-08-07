import React, { Fragment } from 'react'
import { DashboardLayout } from './dashboard'

export const LayoutComponentMap: Record<ViewLayout, React.ComponentType> = {
  marketing: Fragment,
  'with-dashboard-sidebar': DashboardLayout,
  'without-navigation': Fragment,
}

const LayoutFor = (kind: ViewLayout) => LayoutComponentMap[kind]
const wrapInLayout = (Component: React.ComponentType, kind: ViewLayout) => {
  const LayoutComponent = LayoutFor(kind)
  return (
    <LayoutComponent>
      <Component />
    </LayoutComponent>
  )
}

export { LayoutFor, DashboardLayout, wrapInLayout }
