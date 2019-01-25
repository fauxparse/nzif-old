module Types
  class Session < Types::BaseObject
    field :id, ID, null: false
    field :activity, Types::Activity, null: false
    field :starts_at, Types::Time, null: false
    field :ends_at, Types::Time, null: false
    field :venue, Types::Venue, null: true

    def id
      object.to_param
    end
  end
end
