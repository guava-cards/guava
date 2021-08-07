module Types
  class BaseNode < BaseObject
    implements GraphQL::Types::Relay::Node
    global_id_field :id

    field :created_at, GraphQL::Types::ISO8601DateTime,
          'The timestamp this node was created at', null: false

    field :updated_at, GraphQL::Types::ISO8601DateTime,
          'The timestamp this node was last updated at', null: false
  end
end
