import { Box } from '@chakra-ui/react'
import { DeckRow_DeckFragment } from '@guava/library/src'
import dayjs from 'dayjs'
import React from 'react'
import { Link } from '~/shared/components/link'
import { paths } from '~/shared/paths'

export interface DeckRowProps {
  item: DeckRow_DeckFragment
}

export const DeckRow: React.FC<DeckRowProps> = ({ item: deck }) => (
  <Link
    to={paths.decks.detail(deck)}
    d="flex"
    flexDir="row"
    alignItems="center"
    py={3}
    borderBottomWidth={1}
    px={4}
    layerStyle="touchable"
  >
    <Box flex="1" w="full" as="span" fontWeight="medium" fontSize="0.9rem">
      {deck.emoji && (
        <Box as="span" mr={3} aria-hidden>
          {deck.emoji}
        </Box>
      )}
      {deck.name}
    </Box>
    <Box fontSize="xs">{dayjs(deck.createdAt).format('MMM DD')}</Box>
  </Link>
)
