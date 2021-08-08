import { Box, Heading } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useViewerDecksQuery } from '@guava/library'
import { useBreadcrumbs } from '~/shared/context/breadcrumbs'
import { useFirstRender } from '~/shared/hooks/use-first-render'
import { paths } from '~/shared/paths'
import { DeckList } from '../components/deck-list'

export const AllDecks = () => {
  const firstRender = useFirstRender()
  const { addCrumb } = useBreadcrumbs()
  const { data, loading } = useViewerDecksQuery({
    fetchPolicy: 'cache-and-network',
  })

  useEffect(() => {
    addCrumb('Decks', paths.decks.list, { emoji: '🗃' })
  }, [])

  const deckConnection = data?.viewer?.decks

  return (
    <Box mx={-4}>
      <Heading px={4}>All Decks</Heading>
      <DeckList mt={3} loading={loading} connection={deckConnection} />
    </Box>
  )
}
