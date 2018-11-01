Rails.application.routes.draw do
  mount GraphiQL::Rails::Engine, at: '/graphiql', graphql_path: '/graphql' if Rails.env.development?

  post "/graphql", to: "graphql#execute"

  Activity.subclasses.each do |type|
    resolve(type.name) do |activity, options|
      route_for(type.name.underscore, activity.festival.year, activity.to_param, options)
    end
  end

  constraints format: 'json' do
    scope ':year', constraints: { year: /2\d{3}/ } do
      Activity.subclasses.each do |type|
        resources type.to_param, only: %w(index show)
      end
    end
  end

  get '*path' => 'festivals#show'
  root to: 'festivals#show'
end
