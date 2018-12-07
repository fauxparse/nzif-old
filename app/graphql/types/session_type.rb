module Types
  class SessionType < Types::BaseObject
    field :id, ID, null: false
    field :activity_id, ID, null: false
    field :activity, Types::ActivityType, null: false
    field :starts_at, Types::Time, null: false
    field :ends_at, Types::Time, null: false
  end
end
