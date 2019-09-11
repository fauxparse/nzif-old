module Types
  class Allocation < Types::BaseObject
    field :seed, GraphQL::Types::BigInt, null: true
    field :timeslots, [Types::AllocatedTimeslot], null: false
    field :finalized, Boolean, null: false
  end
end
