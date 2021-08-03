module Common
  module Resolver
    module ClassMethods
      attr_reader :authenticated

      def authenticate(enabled = true, **options)
        @authenticated = if enabled
                           options.fetch(:for, :access).to_sym
                         else
                           false
                         end
      end
    end

    def self.included(base)
      base.extend ClassMethods
    end

    def logger
      public_send :logger
    end

    def ready?(**_args)
      authenticate = self.class.authenticated
      logger.debug "#{self.class.name}: Authenticate #{authenticate}"
      public_send "authorize_#{authenticate.to_s.gsub(/_request/, '')}_request!".to_sym if authenticate.present?

      logger.debug "#{self.class.name}: Ready"
      true
    end
  end
end
