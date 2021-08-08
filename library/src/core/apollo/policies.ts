import { relayStylePagination } from '@apollo/client/utilities'
import { TypedTypePolicies } from '../../generated/apollo-helpers'

export const typePolicies: TypedTypePolicies = {
  User: {
    keyFields: ['id'],
    fields: {
      decks: relayStylePagination(),
    },
  },
}
