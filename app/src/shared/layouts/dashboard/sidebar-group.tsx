/**
 * Created by Jesse Onolememen. 26/02/2021
 */

import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'

interface SidebarGroupProps extends Omit<BoxProps, 'action'> {
  title?: string
  action?: () => void
  actionTitle?: string
  ActionIcon?: React.ComponentType
}

const SidebarGroup = ({
  children,
  title,
  action,
  actionTitle,
  ActionIcon,
  ...props
}: SidebarGroupProps) => (
  <Box d="flex" flexDir="column" {...props}>
    {title && (
      <Box
        d="flex"
        flexDir="row"
        alignItems="center"
        px={3}
        pb={1}
        textStyle="uppercase"
        justifyContent="space-between"
        color="mode.secondary.500"
      >
        {title}
        {action && (
          <Box
            role="button"
            d="flex"
            flexDir="row"
            alignItems="center"
            onClick={action}
            layerStyle="secondaryButton"
            _hover={{ color: 'mode.text' }}
          >
            {ActionIcon && (
              <Box mr={1}>
                <ActionIcon />
              </Box>
            )}
            {actionTitle}
          </Box>
        )}
      </Box>
    )}
    <Box d="flex" flexDir="column">
      {children}
    </Box>
  </Box>
)

export { SidebarGroup }
