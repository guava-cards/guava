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

const Breadcrumbs = ({ breadcrumbs, ...props }: BreadcrumbsProps) => {
  const content = (crumb: Breadcrumb) => (
    <>
      {crumb.emoji && (
        <Box as="span" aria-hidden="true">
          {crumb.emoji}&nbsp;&nbsp;
        </Box>
      )}
      {crumb.title}
    </>
  )

  return (
    <Box fontSize="0.8rem" as="ul" layerStyle="lists.slash" {...props}>
      {breadcrumbs.map(crumb => (
        <Box as="li" key={crumb.title?.toString()}>
          {crumb.href ? (
            <Link to={crumb.href}>{content(crumb)}</Link>
          ) : (
            content(crumb)
          )}
        </Box>
      ))}
    </Box>
  )
}
export { Breadcrumbs }
