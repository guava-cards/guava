class QueryContext < GraphQL::Query::Context
  def controller
    self[:controller]
  end
end
