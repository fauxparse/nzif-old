module Types
  class User < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :notifications_count, Integer, null: false

    def notifications_count
      0
    end
  end
end
