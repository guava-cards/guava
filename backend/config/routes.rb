Rails.application.routes.draw do
  mount GraphqlPlayground::Rails::Engine, at: '/playground', graphql_path: '/graphql' unless Rails.env.production?
  post '/graphql', to: 'graphql#execute'
end
