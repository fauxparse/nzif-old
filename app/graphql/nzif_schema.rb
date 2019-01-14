class NzifSchema < GraphQL::Schema
  use GraphQL::Batch
  use GraphQL::Subscriptions::ActionCableSubscriptions

  mutation Types::MutationType
  query Types::QueryType
  subscription Types::SubscriptionType

  orphan_types Types::Workshop, Types::Show

  def resolve_type(type, object, context)
    case object
    when ::Workshop then Types::Workshop.graphql_definition
    when ::Show then Types::Show.graphql_definition
    else
      raise "Unexpected object: #{object.inspect}"
    end
  end
end

%w(queries subscriptions).each do |kind|
  Dir[Rails.root.join('app', 'graphql', kind, '**/*.rb')].each do |file|
    require_dependency file.sub(%r{#{Rails.root}/app/graphql/(.*)\.rb}, '\1')
  end
end
