class QueryContext < GraphQL::Query::Context
  def controller
    self[:controller]
  end

  def assign_auth_token_cookies(auth_token)
    controller.assign_auth_token_cookies(auth_token) if auth_token.present?
  end
end
