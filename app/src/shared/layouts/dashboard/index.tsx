import { Box } from '@chakra-ui/react'
import { Suspense } from 'react'
import { Breadcrumb, BreadcrumbsProvider } from '../../context/breadcrumbs'
import { WIDTH as SIDEBAR_WIDTH, DashboardSidebar } from './sidebar'
import { DashboardHeader } from './header'
import { DashboardLoading } from './loading'
import { Head } from '../../components/head'

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
  initialCrumbs = [{ title: 'Home', href: '/', emoji: '🏡 ' }],
}) => (
  <BreadcrumbsProvider crumbs={initialCrumbs}>
    <Box d="flex" h="full">
      <Head title="🏡 Home" />
      {console.log(withBreadcrumbs)}
      {withSidebar && <DashboardSidebar />}
      <Suspense fallback={<DashboardLoading />}>
        <Box w="full" ml={withSidebar ? SIDEBAR_WIDTH : 0} px={4} py={1}>
          {withNavigation && <DashboardHeader breadcrumbs={withBreadcrumbs} />}
          {children}
        </Box>
      </Suspense>
    </Box>
  </BreadcrumbsProvider>
)
