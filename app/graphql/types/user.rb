module Types
  class User < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :notifications_count, Integer, null: false
    field :roles, [UserRole], null: false
    field :country, String, null: true
    field :origin, String, null: true
    field :bio, String, null: true

    def notifications_count
      0
    end
  end
end
