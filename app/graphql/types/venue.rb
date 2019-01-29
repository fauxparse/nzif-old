module Types
  class Venue < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :address, String, null: false
    field :latitude, Float, null: false
    field :longitude, Float, null: false
  end
end
