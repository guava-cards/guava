module GraphQLHelper
  attr_reader :json

  def do_graphql_request(**options)
    post '/graphql', params: {
      query: options[:query] || query,
      variables: options[:variables] || variables
    }

    @underscore_keys = underscore_keys
    @json = JSON.parse(response.body).deep_transform_keys do |key|
      new_key = key.to_sym
      new_key = new_key.to_s.underscore.to_sym if underscore_keys
      new_key
    end
  end

  def variables
    {}
  end

  def data
    OpenStruct.new(@json)
  end

  def mutation_errors
    @json.dig(
      'data',
      described_class.graphql_name.camelize(:lower),
      @underscore_keys ? :validation_errors : :validationErrors
    )
  end
end

RSpec.configure do |c|
  c.include GraphQLHelper, type: :request
end
