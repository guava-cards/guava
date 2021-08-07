/**
 * Created by Jesse Onolememen. 27/02/2021
 */
import React from 'react'
import { Box, BoxProps, HStack } from '@chakra-ui/react'
import BisBell from '@meronex/icons/bi/BisBell'
import { DarkModeButton } from '../../components/dark-mode-button'
import { Breadcrumbs } from '../../components/breadcrumbs'
import { useBreadcrumbs } from '../../context/breadcrumbs'

export interface DashboardHeaderProps extends BoxProps {
  breadcrumbs?: boolean
}

export const DashboardHeader = ({
  breadcrumbs = false,
  ...props
}: DashboardHeaderProps) => {
  const { crumbs } = useBreadcrumbs()

  return (
    <Box
      d="flex"
      flexDir="row"
      justifyContent="space-between"
      alignItems="center"
      color="mode.secondary.500"
      {...props}
    >
      {breadcrumbs && <Breadcrumbs breadcrumbs={crumbs} />}
      <HStack>
        <DarkModeButton />
        <BisBell />
      </HStack>
    </Box>
  )
}
