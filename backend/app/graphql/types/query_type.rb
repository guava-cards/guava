module Types
  class QueryType < Types::BaseObject
    description 'Root query field'
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    field :viewer, resolver: Queries::ViewerQuery
  end
end
