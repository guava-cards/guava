# rubocop:disable GraphQL/FieldDescription
module Types
  class MutationType < Types::BaseObject
    description 'The root mutation type'

    field :login_user, mutation: Mutations::Auth::LoginMutation
    field :request_password_reset, mutation: Mutations::Auth::RequestPasswordReset
    field :reset_password, mutation: Mutations::Auth::ResetPassword
  end
end
# rubocop:enable GraphQL/FieldDescription
