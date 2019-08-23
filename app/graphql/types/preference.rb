module Types
  class Preference < Types::BaseObject
    field :session_id, ID, null: false
    field :position, Integer, null: false

    def session_id
      ::Session.encode_id(object.session_id)
    end
  end
end
