/**
 * Created by Jesse Onolememen. 26/02/2021
 */

import React from 'react'
import { Box } from '@chakra-ui/react'
import { Link, LinkProps } from '../../components/link'
import { paths } from '~/shared/paths'

interface SidebarLinkProps extends LinkProps {
  title: string
  Icon?: React.ComponentType
  to: string
}

const SidebarLink = ({ title, Icon, to, ...props }: SidebarLinkProps) => {
  const icon = Icon ? <Icon /> : null

  return (
    <Link
      to={to}
      layerStyle="touchable"
      py={2}
      mx={2}
      px={2}
      mb={0.5}
      w="auto"
      rounded="md"
      fontSize="0.85rem"
      fontWeight="medium"
      d="flex"
      flexDir="row"
      alignItems="center"
      className="sidebar-link"
      exact={to === paths.home}
      {...props}
    >
      {icon && <Box mr={2}>{icon}</Box>}
      <Box lineHeight={1}>{title}</Box>
    </Link>
  )
}

export { SidebarLink }
