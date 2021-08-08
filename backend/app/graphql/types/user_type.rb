module Types
  class UserType < Types::BaseNode
    description 'A user object'

    field :decks, DeckType.connection_type, "A connection holding all of the user's decks", null: true
    field :email, String, "The user's email address", null: true
    field :username, String, "The user's username", null: false

    authorize_object_field :email, rule: :edit?
  end
end
