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
