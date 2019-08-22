module Types
  class User < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :email, String, null: false
    field :notifications_count, Integer, null: false
    field :roles, [UserRole], null: false
    field :city, String, null: true
    field :country, String, null: true
    field :origin, String, null: true
    field :bio, String, null: true
    field :phone, String, null: true
    field :image, Types::UserImage, null: true

    def notifications_count
      0
    end

    def image
      object.image.attached? ? object.image : nil
    end
  end
end
