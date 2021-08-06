# rubocop:disable GraphQL/FieldDescription
module Types
  class MutationType < Types::BaseObject
    description 'The root mutation type'

    field :identity_check, mutation: Mutations::Auth::IdentityCheckMutation
    field :upsert_user, mutation: Mutations::Users::UpsertUserMutation
  end
end
# rubocop:enable GraphQL/FieldDescription
