require_relative 'boot'

require 'rails'
require 'active_model/railtie'
require 'active_job/railtie'
require 'active_record/railtie'
require 'active_storage/engine'
require 'action_controller/railtie'
require 'action_mailer/railtie'
require 'action_view/railtie'
require 'action_cable/engine'
require 'sprockets/railtie'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)
Dotenv::Railtie.load

module Guava
  class Application < Rails::Application
    config.load_defaults 6.1
    config.api_only = true
    config.cache_store = :redis_cache_store, { url: ENV['REDIS_URL'] }

    config.after_initialize do
      Rails.application.load_tasks
      Rake::Task['firebase:certificates:request'].invoke
    end
  end
end
