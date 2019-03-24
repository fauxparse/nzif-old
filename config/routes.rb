Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?

  mount ActionCable.server => '/subscriptions'

  post '/graphql', to: 'graphql#execute', as: :graphql

  match '/auth/:provider/callback',
    to: 'oauth#callback',
    via: %i(get post),
    provider: %r{facebook|twitter|google}

  get '*path' => 'festivals#show', constraints: lambda { |req| req.path.exclude?('active_storage') }
  root to: 'festivals#show'
end
