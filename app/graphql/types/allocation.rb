module Types
  class Allocation < Types::BaseObject
    field :seed, GraphQL::Types::BigInt, null: false
    field :timeslots, [Types::AllocatedTimeslot], null: false
  end
end
