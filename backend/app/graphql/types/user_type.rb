module Types
  class UserType < Types::BaseNode
    description 'A user object'

    field :email, String, "The user's email address", null: true
    field :username, String, "The user's username", null: false

    authorize_object_field :email, rule: :edit?
  end
end
