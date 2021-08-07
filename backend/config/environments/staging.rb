require File.expand_path('production.rb', __dir__)

Rails.application.configure do
  config.serve_static_files = true
end
