Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?

  post "/graphql", to: "graphql#execute"

  get '*path' => 'festivals#show'
  root to: 'festivals#show'
end
