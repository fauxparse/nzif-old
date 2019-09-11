module Types
  class AllocationList < BaseInputObject
    description 'List of regiistration IDs to allocate to a session'
    argument :session_id, GraphQL::Types::ID, required: true
    argument :registration_ids, [GraphQL::Types::ID], required: true
  end
end
