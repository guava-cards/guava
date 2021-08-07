module Mutations
  module Decks
    class UpdateDeckMutation < BaseMutation
      description 'Updates a deck with a given id'
      authenticate true

      argument :deck_id, ID, 'The id of the deck to update', loads: Types::DeckType, required: true
      argument :description, String, 'An updated description for the deck', required: false
      argument :emoji, String, 'The updated emoji for the deck', required: false
      argument :emoji_alt, String, 'The updated alt text of the emoji', required: false
      argument :name, String, 'The updated name of the new deck', required: false
      argument :visibility_mode, Types::DeckVisbilityModeType, 'The updated visibility for the deck', required: false

      field :deck, Types::DeckType, 'The updated deck', null: true
      field :success, Boolean, 'Whether the mutation ran successfully or not', null: false
      field :validation_errors, Types::ValidationErrorType, 'The validation errors returned from this mutation',
            null: true

      def resolve(deck:, **params)
        authorize! deck, to: :update?

        if deck.update(params)
          { deck: deck, success: true }
        else
          { errors: deck.errors, success: false }
        end
      end
    end
  end
end
