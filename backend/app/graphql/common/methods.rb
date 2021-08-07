module Common
  module Methods
    delegate :controller, to: :context
    delegate :request, to: :controller
    delegate :response, to: :controller
    delegate :logger, to: :controller
    delegate :current_user, to: :controller
    delegate :raw_token, to: :controller
    delegate :authentication_manager, to: :controller

    def authenticate!
      raise Errors::Unauthenticated if current_user.blank?
    end
  end
end
