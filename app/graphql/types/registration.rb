module Types
  class Registration < Types::BaseObject
    field :code_of_conduct_accepted_at, Types::Time, null: true
    field :preferences, [Preference], null: false
  end
end
