import React, { useContext, useState, createContext } from 'react'
import { LinkProps } from 'react-router-dom'

export interface Breadcrumb extends Pick<LinkProps, 'href'> {
  title: React.ReactNode | string
  icon?: React.ComponentType
  emoji?: string
}

export interface BreadcrumbsContextValue {
  crumbs: Breadcrumb[]
  addCrumb: (
    title: Breadcrumb['title'],
    href: Breadcrumb['href'],
    props?: Omit<Breadcrumb, 'title' | 'href'>
  ) => void

  setCrumbs: (crumbs: Breadcrumb[]) => void
}

export interface BreadcrumbsProviderProps {
  crumbs?: Breadcrumb[]
}

export const BreadcrumbsContext = createContext({} as BreadcrumbsContextValue)
export const BreadcrumbsProvider: React.FC<BreadcrumbsProviderProps> = ({
  crumbs: initialCrumbs = [],
  children,
}) => {
  const [crumbs, setCrumbs] = useState(initialCrumbs ?? [])

  return (
    <BreadcrumbsContext.Provider
      value={{
        crumbs,
        addCrumb: (title, href, otherProps) => {
          setCrumbs(before => [
            ...before,
            {
              ...otherProps,
              title,
              href,
            },
          ])
        },

        setCrumbs: newCrumbs => {
          setCrumbs([...initialCrumbs, ...newCrumbs])
        },
      }}
    >
      {children}
    </BreadcrumbsContext.Provider>
  )
}

export function useBreadcrumbs() {
  return useContext(BreadcrumbsContext)
}
