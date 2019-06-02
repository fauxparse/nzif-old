module Types
  class Slot < Types::BaseObject
    field :starts_at, Types::Time, null: false
    field :ends_at, Types::Time, null: false
    field :activity_type, String, null: false
  end
end
