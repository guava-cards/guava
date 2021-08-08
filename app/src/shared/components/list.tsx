import React, { Fragment } from 'react'
import { ApolloError } from '@apollo/client'
import { Box, BoxProps, Spinner } from '@chakra-ui/react'
import { getNodesFromConnection } from '../utils/lists'

export interface ListPageInfo {
  hasNextPage?: boolean
  endCusror?: string
}

export interface ListConnection<ItemType> {
  edges?:
    | (
        | {
            cursor: string
            node?: ItemType | null
          }
        | null
        | undefined
      )[]
    | null

  pageInfo?: ListPageInfo
}

export interface ListErrorStateProps {
  error?: ListError
}

export type ListError = ApolloError | Error | string

export interface ListProps<ItemType> extends BoxProps {
  data?: ItemType[]
  connection?: ListConnection<ItemType> | null
  keyExtractor?: (item: ItemType, index: number) => string
  renderItem?: (item: ItemType, index: number) => React.ReactNode
  ItemComponent?: React.ComponentType<{ item: ItemType; index?: number }>
  loading?: boolean
  LoadingComponent?: React.ComponentType
  renderLoading?: () => React.ReactNode
  error?: ListError
  emptyStateEnabled?: boolean
  ErrorStateComponent?: React.ComponentType<ListErrorStateProps>
  renderErrorState?: () => React.ReactNode
  EmptyStateComponent?: React.ComponentType
  renderEmptyState?: () => React.ReactNode
}

/**
 * A generic component for rendering lists/grids with relay-style
 * connection pagination
 */
export function List<ItemType>({
  data,
  connection,
  renderItem,
  ItemComponent,
  loading,
  LoadingComponent,
  renderLoading,
  error,
  EmptyStateComponent,
  renderErrorState,
  ErrorStateComponent,
  renderEmptyState: _renderEmptyState,
  emptyStateEnabled = true,
  keyExtractor,
  ...boxProps
}: ListProps<ItemType>): JSX.Element {
  const nodes = data ?? getNodesFromConnection(connection)
  const isEmpty = nodes?.length < 1
  const isLoading = loading && isEmpty
  const isError = isEmpty && error

  console.log(nodes)

  const renderListItem = (node: ItemType, index: number): React.ReactNode => {
    if (ItemComponent) return <ItemComponent item={node} index={index} />
    if (renderItem) return renderItem(node, index)

    throw new Error(
      'Invalid List Props: You must specify either renderItem or ItemComponent'
    )
  }

  const extractKey = (node: ItemType, index: number): string => {
    const key = keyExtractor?.(node, index) ?? (node as any).id ?? `${index}`
    return key
  }

  const renderLoadingState = () => {
    if (renderLoading) return renderLoading()
    if (LoadingComponent) return <LoadingComponent />

    return <Spinner />
  }

  const renderError = () => {
    if (renderErrorState) return renderErrorState()
    if (ErrorStateComponent) return <ErrorStateComponent error={error} />

    return <div>Error</div>
  }

  const renderEmptyState = () => {
    if (!emptyStateEnabled) return null
    if (_renderEmptyState) return _renderEmptyState()
    if (EmptyStateComponent) return <EmptyStateComponent />

    return <p>Empty state</p>
  }

  return (
    <Box d="flex" flexDir="column" {...boxProps}>
      {isLoading ? (
        renderLoadingState()
      ) : (
        <>
          {isError ? (
            renderError()
          ) : (
            <>
              {isEmpty
                ? renderEmptyState()
                : nodes.map((node, item) => (
                    <Fragment key={extractKey(node, item)}>
                      {renderListItem(node, item)}
                    </Fragment>
                  ))}
            </>
          )}
        </>
      )}
    </Box>
  )
}
