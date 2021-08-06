# rubocop:disable GraphQL/FieldDescription
module Types
  class MutationType < Types::BaseObject
    description 'The root mutation type'

    field :create_user, mutation: Mutations::Users::CreateUserMutation
    field :identity_check, mutation: Mutations::Auth::IdentityCheckMutation
  end
end
# rubocop:enable GraphQL/FieldDescription
