import { Box } from '@chakra-ui/react'
import React, { Suspense } from 'react'
import { Breadcrumb, BreadcrumbsProvider } from '../../context/breadcrumbs'
import { WIDTH as SIDEBAR_WIDTH, DashboardSidebar } from './sidebar'
import { DashboardHeader } from './header'
import { DashboardLoading } from './loading'

export interface DashboardLayoutProps {
  withSidebar?: boolean
  withNavigation?: boolean
  withBreadcrumbs?: boolean
  initialCrumbs?: Breadcrumb[]
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  withSidebar = true,
  withNavigation = true,
  withBreadcrumbs = false,
  children,
  initialCrumbs = [],
}) => (
  <BreadcrumbsProvider crumbs={initialCrumbs}>
    <Box d="flex" h="full">
      {withSidebar && <DashboardSidebar />}
      <Suspense fallback={<DashboardLoading />}>
        <Box ml={withSidebar ? SIDEBAR_WIDTH : 0} p={4}>
          {withNavigation && <DashboardHeader breadcrumbs={withBreadcrumbs} />}
          {children}
        </Box>
      </Suspense>
    </Box>
  </BreadcrumbsProvider>
)
