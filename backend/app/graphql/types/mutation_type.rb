# rubocop:disable GraphQL/FieldDescription
module Types
  class MutationType < Types::BaseObject
    description 'The root mutation type'

    field :create_deck, mutation: Mutations::Decks::CreateDeckMutation
    field :identity_check, mutation: Mutations::Auth::IdentityCheckMutation
    field :update_deck, mutation: Mutations::Decks::UpdateDeckMutation
    field :upsert_user, mutation: Mutations::Users::UpsertUserMutation
  end
end
# rubocop:enable GraphQL/FieldDescription
