class NzifSchema < GraphQL::Schema
  mutation Types::MutationType
  query Types::QueryType

  use GraphQL::Batch
end

%w(queries mutations).each do |kind|
  Dir[Rails.root.join('app', 'graphql', kind, '**/*.rb')].each do |file|
    require_dependency file.sub(/#{Rails.root}\/(.*)\.rb/, '\1')
  end
end
