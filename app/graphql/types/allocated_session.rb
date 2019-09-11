module Types
  class AllocatedSession < Types::BaseObject
    field :session_id, GraphQL::Types::ID, null: false
    field :registration_ids, [GraphQL::Types::ID], null: false
  end
end
