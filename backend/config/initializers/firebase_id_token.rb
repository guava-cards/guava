FirebaseIdToken.configure do |config|
  config.project_ids = [Rails.application.credentials[:firebase_project_id]]
  config.redis = Redis.new url: ENV['REDIS_URL']
end
