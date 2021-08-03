import { Box, BoxProps } from '@chakra-ui/react'
import BisCog from '@meronex/icons/bi/BisCog'
import BsFillPeopleFill from '@meronex/icons/bs/BsFillPeopleFill'
import HiHome from '@meronex/icons/hi/HiHome'
import MdcCardsOutline from '@meronex/icons/mdc/MdcCardsOutline'
import React from 'react'
import { SidebarGroup } from './sidebar-group'
import { SidebarLink } from './sidebar-link'
import { SidebarFooter } from './sidebar-footer'

export const WIDTH = 250

export const DashboardSidebar: React.FC<BoxProps> = props => (
  <Box
    {...props}
    as="aside"
    backgroundColor="mode.background.600"
    borderRightWidth={0.5}
    borderRightColor="mode.defaultBorder"
    width={WIDTH}
    d="flex"
    flexDir="column"
    pos="fixed"
    left={0}
    top={0}
    bottom={0}
  >
    {/* <Box
        layerStyle="touchable"
        px={3}
        py={3}
        alignItems="center"
        d="flex"
        justifyContent="space-between"
        as="button"
      >
        <CurrentUserRow />
      </Box> */}
    <Box flex="1">
      <SidebarGroup mb={5} mt={3}>
        <SidebarLink title="Home" to="/" Icon={HiHome} />
        <SidebarLink title="Decks" to="/decks" Icon={MdcCardsOutline} />
        <SidebarLink title="Shared" to="/share" Icon={BsFillPeopleFill} />
        <SidebarLink title="Preferences" to="/settings" Icon={BisCog} />
      </SidebarGroup>
      <SidebarGroup>{/* <DeckList decks={decks} /> */}</SidebarGroup>
    </Box>
    <SidebarFooter />
  </Box>
)
