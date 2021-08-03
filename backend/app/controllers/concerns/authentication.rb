module Authentication
  extend ActiveSupport::Concern
  include JwtAuth

  def viewer
    @viewer ||= current_user
  end

  def current_user
    @current_user ||= User.find payload['user_id'] if payload.present?
  rescue JWTSessions::Errors::Error
    nil
  end

  # rubocop:disable Metrics/MethodLength
  def assign_auth_token_cookies(auth_token)
    response.set_cookie JWTSessions.access_cookie,
                        value: auth_token[:access],
                        httponly: true,
                        secure: !Rails.env.development?,
                        same_site: 'Strict'

    response.set_cookie JWTSessions.refresh_cookie,
                        value: auth_token[:refresh],
                        httponly: true,
                        secure: !Rails.env.development?,
                        same_site: 'Strict',
                        expires: auth_token[:refresh_expires_at]

    response.set_cookie :_authenticated,
                        value: true,
                        httponly: false,
                        secure: !Rails.env.development?,
                        same_site: 'Strict',
                        expires: auth_token[:refresh_expires_at]

    response.set_cookie :csrf_token,
                        value: auth_token[:csrf],
                        httponly: false,
                        secure: !Rails.env.development?,
                        same_site: 'Strict'
  end
  # rubocop:enable Metrics/MethodLength
end
