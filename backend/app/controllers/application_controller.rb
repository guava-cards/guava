class ApplicationController < ActionController::API
  include Authentication
  include JWTSessions::RailsAuthorization
end
