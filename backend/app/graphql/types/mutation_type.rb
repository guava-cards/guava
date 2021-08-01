# rubocop:disable GraphQL/FieldDescription
module Types
  class MutationType < Types::BaseObject
    description 'The root mutation type'
    field :login_user, mutation: Mutations::Auth::LoginMutation
  end
end
# rubocop:enable GraphQL/FieldDescription
