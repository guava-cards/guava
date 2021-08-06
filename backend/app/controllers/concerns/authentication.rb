module Authentication
  extend ActiveSupport::Concern

  def current_user
    @current_user ||= authentication_manager.viewer
  end

  def authentication_manager
    @authentication_manager ||= AuthenticationManager.new(raw_token)
  end

  def raw_token
    request.headers['Authorization']&.split&.last
  end
end
