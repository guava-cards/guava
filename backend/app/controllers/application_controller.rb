class ApplicationController < ActionController::API
  include Authentication
  include ActionPolicy::Controller

  authorize :user, through: :current_user
end
