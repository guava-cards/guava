# rubocop:disable GraphQL/FieldDescription, GraphQL/ExtractType
module Types
  class MutationType < Types::BaseObject
    description 'The root mutation type'

    field :activate_account, mutation: Mutations::Auth::ActivateAccountMutation
    field :login_user, mutation: Mutations::Auth::LoginMutation
    field :refresh_access_token, mutation: Mutations::Auth::RefreshAccessTokenMutation
    field :request_account_activation, mutation: Mutations::Auth::RequestActivationLinkMutation
    field :request_password_reset, mutation: Mutations::Auth::RequestPasswordReset
    field :reset_password, mutation: Mutations::Auth::ResetPassword
  end
end
# rubocop:enable GraphQL/FieldDescription, GraphQL/ExtractType
