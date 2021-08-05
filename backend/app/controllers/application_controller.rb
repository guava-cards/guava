class ApplicationController < ActionController::API
  include Authentication
  include JWTSessions::RailsAuthorization
  include ActionPolicy::Controller

  # before_action :authorize_access_request!
  authorize :user, through: :current_user
end
