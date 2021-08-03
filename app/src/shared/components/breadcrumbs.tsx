/**
 * Created by Jesse Onolememen. 27/02/2021
 */

import React from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from '../context/breadcrumbs'

interface BreadcrumbsProps extends BoxProps {
  breadcrumbs: Breadcrumb[]
}

const Breadcrumbs = ({ breadcrumbs, ...props }: BreadcrumbsProps) => (
  <Box as="ul" layerStyle="lists.slash" {...props}>
    {breadcrumbs.map(crumb => (
      <Box as="li" key={crumb.title?.toString()}>
        {crumb.href ? <Link to={crumb.href}>{crumb.title}</Link> : crumb.title}
      </Box>
    ))}
  </Box>
)

export { Breadcrumbs }
