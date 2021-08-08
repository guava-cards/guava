module Mutations
  module Decks
    class CreateDeckMutation < BaseMutation
      description 'Creates a new deck for the authenticated user and returns it'
      authenticate true

      argument :description, String, 'An optional description for the deck', required: false
      argument :emoji, String, 'The emoji for the new deck', required: false
      argument :emoji_alt, String, 'The alt text of the emoji', required: false
      argument :name, String, 'The name of the new deck', required: true
      argument :visibility_mode, Types::DeckVisbilityModeType, 'The visibility for the new deck', required: true

      field :deck_edge, Types::DeckType.edge_type, 'The pagination edge for the newly created deck', null: true
      field :success, Boolean, 'Whether the mutation ran successfully or not', null: false
      field :validation_errors, Types::ValidationErrorType, 'The validation errors returned from this mutation',
            null: true

      def resolve(**params)
        deck = current_user.decks.new(params)
        authorize! deck, to: :create?

        return { errors: deck.errors, success: false } unless deck.save!

        range_add = GraphQL::Relay::RangeAdd.new(
          parent: current_user,
          collection: current_user.decks,
          item: deck,
          context: context
        )

        { deck_edge: range_add.edge, success: true }
      end
    end
  end
end
