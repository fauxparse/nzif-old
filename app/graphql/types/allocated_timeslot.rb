module Types
  class AllocatedTimeslot < Types::BaseObject
    field :starts_at, Types::Time, null: false
    field :sessions, [Types::AllocatedSession], null: false
    field :unallocated, [GraphQL::Types::ID], null: false
  end
end
