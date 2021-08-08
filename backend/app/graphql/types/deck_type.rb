module Types
  class DeckType < Types::BaseNode
    description 'A deck represents a collection of flashcards'
    authroize_allowed_to :view?

    field :description, String, 'An optional description of the deck', null: true
    field :emoji, String, 'An optional emoji for the deck', null: true
    field :emoji_alt, String, 'The alt text for the deck emoji', null: true
    field :name, String, 'The name of the deck', null: false
    field :user, UserType, 'The user whom the deck belongs to', null: false
    field :visibility_mode, DeckVisbilityModeType, 'The visiblity of the deck', null: true

    authorize_object_field :visibility_mode, rule: :destroy?
    expose_authorization_rules :view?, :update?, :destroy?, prefix: 'can_'
  end
end
