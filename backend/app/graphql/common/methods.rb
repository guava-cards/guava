module Common
  module Methods
    include JWTSessions::RailsAuthorization

    delegate :controller, to: :context
    delegate :request, to: :controller
    delegate :response, to: :controller
    delegate :logger, to: :controller

    def viewer
      @viewer ||= User.find payload['user_id'] if payload.present?
    rescue JWTSessions::Errors::Error
      nil
    end

    def authorized_viewer
      authorize_request!
      viewer
    rescue JWTSessions::Errors::Error
      nil
    end

    def authorize_request!
      authorize_access_request!
    end

    # rubocop:disable Lint/UselessMethodDefinition
    def authorize_access_request!
      super
    end

    def authorize_refresh_request!
      super
    end
    # rubcop:enable Lint/UselessMethodDefinition
  end
end
