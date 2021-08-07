module Common
  module Resolver
    module ClassMethods
      attr_reader :authenticated

      def authenticate(enabled = true)
        @authenticated = enabled
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
      logger.debug "#{self.class.name}: Authenticated Request"
      public_send :authenticate! if authenticate

      logger.debug "#{self.class.name}: Ready"
      true
    end
  end
end
