module Types
  class ValidationErrorType < Types::BaseObject
    description 'A mutation validation error object'

    field :description, String, 'Summary of the validation errors', null: false
    field :details, GraphQL::Types::JSON,
          'A JSON-object that contains a detail of each of the field-level validation errors', null: false
    field :full_messages, [String], 'Full error messages for each field', null: false

    field :messages, GraphQL::Types::JSON,
          'A json object that contains all the validation errors for a give field',
          null: false

    def description
      object.full_messages.join(', ')
    end

    def messages
      object.messages.stringify_keys.deep_transform_keys! do |key|
        key.camelize(:lower)
      end
    end
  end
end
