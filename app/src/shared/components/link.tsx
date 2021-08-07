/* eslint-disable @typescript-eslint/indent */
import React from 'react'
import { chakra, LinkProps as ChakraLinkProps } from '@chakra-ui/react'
import {
  NavLink as RouterLink,
  NavLinkProps as RouterLinkProps,
} from 'react-router-dom'

export type LinkProps = Omit<RouterLinkProps, 'end'> &
  Omit<ChakraLinkProps, 'as' | 'href'> & {
    exact?: boolean
  }

const ChakraLink = chakra(RouterLink)

const Link = ({
  activeClassName = 'active',
  exact = true,
  ...props
}: LinkProps) => (
  <ChakraLink
    activeClassName={activeClassName}
    exact={exact}
    active
    {...props}
  />
)

export { Link }
