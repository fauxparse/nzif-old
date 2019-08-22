module Types
  class Preference < Types::BaseObject
    field :session_id, ID, null: false
    field :position, Integer, null: false
  end
end
