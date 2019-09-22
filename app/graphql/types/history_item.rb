module Types
  class HistoryItem < Types::BaseObject
    field :id, ID, null: false
    field :description, String, null: false
    field :timestamp, Types::Time, null: false

    def timestamp
      object.created_at
    end
  end
end
