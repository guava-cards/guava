class GuavaSchema < GraphQL::Schema
  include Common::ErrorHandling

  mutation(Types::MutationType)
  query(Types::QueryType)

  # GraphQL::Batch setup:
  use GraphQL::Batch
  context_class QueryContext
  max_complexity 200
  max_depth 20
  default_max_page_size 20

  # Union and Interface Resolution
  def self.resolve_type(_abstract_type, object, _ctx)
    object_name = object.class.name
    type_name = "Types::#{object_name}Type"
    type_class = type_name.safe_constantize
    raise "Unexpected Object: #{object}" if type_class.blank?

    type_class
  end

  # Relay-style Object Identification:

  # Return a string UUID for `object`
  def self.id_from_object(object, _type_definition, _query_ctx)
    Base64.urlsafe_encode64 object.to_global_id.to_s
  end

  # Given a string UUID, find the object
  def self.object_from_id(id, _query_ctx)
    global_id = Base64.decode64 id
    GlobalID::Locator.locate global_id
  end
end
