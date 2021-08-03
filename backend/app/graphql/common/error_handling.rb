module Common
  module ErrorHandling
    extend ActiveSupport::Concern

    ERROR_EXTENSIONS = {
      'JWTSessions::Errors::Malconfigured' => { code: :unauthenticated, status: 401 },
      'JWTSessions::Errors::InvalidPayload' => { code: :unauthenticated, status: 401 },
      'JWTSessions::Errors::Unauthorized' => { code: :unauthenticated, status: 401 },
      'JWTSessions::Errors::ClaimsVerification' => { code: :unauthenticated, status: 401 },
      'JWTSessions::Errors::Expired' => { code: :needs_refresh, status: 401 }
    }.freeze

    ERROR_HANDLERS = {
      'ActiveRecord::RecordNotFound' => :not_found_error
    }.freeze

    included do
      rescue_from StandardError do |error, object, args, context, field|
        error_name = error.class.name
        handler_method = ERROR_HANDLERS[error_name]&.to_sym

        if handler_method
          public_send(
            handler_method,
            error, object, args, context, field
          )
        else
          handle_standard_error(
            error,
            object, args, context, field
          )
        end
      end
    end

    module ClassMethods
      def handle_standard_error(error, _object, _args, _context, _field)
        name = error.class.name
        extensions = ERROR_EXTENSIONS[name]
        extensions ||= {
          code: error.try(:code) || name.underscore,
          status: error.try(:status) || 500
        }
        message = error.message
        message ||= 'An error has ocurred'

        raise GraphQL::ExecutionError.new message, extensions: extensions
      end

      def not_found_error(_err, _obj, _args, _ctx, field)
        raise GraphQL::ExecutionError, "#{field.type.unwrap.graphql_name} not found"
      end
    end
  end
end
