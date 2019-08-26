module Types
  class Availability < Types::BaseObject
    field :session_id, ID, null: false
    field :role, String, null: false

    def session_id
      ::Session.encode_id(object.session_id)
    end
  end
end
