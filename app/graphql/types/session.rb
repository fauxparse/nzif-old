module Types
  class Session < Types::BaseObject
    field :id, ID, null: false
    field :activity_id, ID, null: false
    field :activity, Types::Activity, null: false
    field :starts_at, Types::Time, null: false
    field :ends_at, Types::Time, null: false
    field :venue, Types::Venue, null: true
    field :capacity, Integer, null: true
    field :placements_count, Integer, null: false
    field :full, Boolean, null: false

    def id
      object.to_param
    end

    def full
      object.full?
    end
  end
end
