import React from 'react'
import { DeckRow_DeckFragment } from '@guava/library'
import { BoxProps } from '@chakra-ui/react'
import { List, ListConnection } from '~/shared/components/list'
import { DeckRow } from './deck-row'

export interface DeckListProps extends BoxProps {
  connection?: ListConnection<DeckRow_DeckFragment> | null
  decks?: DeckRow_DeckFragment[]
  loading?: boolean
}

export const DeckList: React.FC<DeckListProps> = ({
  decks,
  connection,
  loading,
  ...props
}) => (
  <List
    {...props}
    loading={loading}
    data={decks}
    connection={connection}
    ItemComponent={DeckRow}
    borderTopWidth={1}
  />
)
