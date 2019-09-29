Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?

  mount ActionCable.server => '/subscriptions'

  mount Stripe::Engine => '/stripe'

  post '/graphql', to: 'graphql#execute', as: :graphql

  match '/auth/:provider/callback',
    to: 'oauth#callback',
    via: %i(get post),
    provider: %r{facebook|twitter|google}

  match '/payments/:id/cancel',
    to: 'payments#cancel',
    via: %i(get post),
    as: 'cancel_payment'

  match '/calendar/:id',
    to: 'calendars#show',
    via: %i(get),
    as: 'calendar'

  get(
    '*path' => 'festivals#show',
    constraints: lambda { |req| req.path.exclude?('active_storage') },
    as: :front_end
  )

  root to: 'festivals#show'
end
