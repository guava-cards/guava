module JwtAuth
  module_function

  def create_auth_token_for_user(user)
    create_session_for_user(user).login
  end

  def create_access_token_from_refresh_for_user(user, refresh_token)
    create_session_for_user(user).refresh(refresh_token)
  end

  def create_session_for_user(user)
    JWTSessions::Session.new(
      payload: user.jwt_payload,
      refresh_payload: user.try(:jwt_refresh_payload) || user.jwt_payload
    )
  end
end
