module Types
  class BaseObject < GraphQL::Schema::Object
    include ActionPolicy::GraphQL::Behaviour
    include ActionPolicy::Behaviours::ThreadMemoized
    include ActionPolicy::Behaviours::Memoized
    include ActionPolicy::Behaviours::Namespaced
    include Common::Methods

    edge_type_class(Types::BaseEdge)
    connection_type_class(Types::BaseConnection)
    field_class Types::BaseField
    field_class.prepend(ActionPolicy::GraphQL::AuthorizedField)

    authorize :user, through: :authorized_viewer

    include ActionPolicy::GraphQL::Fields

    class << self
      def authorize_object_field(*fields, rule: nil, policy: nil, raise_error: false)
        fields.each do |field|
          define_method field.to_sym do
            rule ||= "#{field}?".to_sym
            authorize_object!(rule, policy: policy, raise_error: raise_error) do
              object.public_send field
            end
          end
        end
      end
    end

    def authorize_object!(rule, policy: nil, raise_error: false)
      object_name = object.class.name
      object_policy = "#{object_name}Policy".safe_constantize || policy
      authorize! object, to: rule, with: object_policy

      yield
    rescue ActionPolicy::Unauthorized => e
      raise e if raise_error
    end
  end
end
