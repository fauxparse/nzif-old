module Types
  class HistoryItem < Types::BaseObject
    field :id, ID, null: false
    field :description, String, null: false
    field :icon, String, null: false
    field :timestamp, Types::Time, null: false
    field :type, String, null: false

    def timestamp
      object.created_at
    end

    def type
      object.class.name.demodulize.underscore
    end
  end
end
