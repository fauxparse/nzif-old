class NzifSchema < GraphQL::Schema
  use GraphQL::Batch
  use GraphQL::Subscriptions::ActionCableSubscriptions

  mutation Types::MutationType
  query Types::QueryType
  subscription Types::SubscriptionType
end

%w(queries mutations subscriptions).each do |kind|
  Dir[Rails.root.join('app', 'graphql', kind, '**/*.rb')].each do |file|
    require_dependency file.sub(%r{#{Rails.root}/app/graphql/(.*)\.rb}, '\1')
  end
end
