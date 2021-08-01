module Types
  class QueryType < Types::BaseObject
    description 'Root query field'
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :check_if_user_exists, resolver: Queries::Auth::IdentityCheckQuery
  end
end
