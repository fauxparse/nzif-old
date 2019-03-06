module Types
  class Pitch
    class Presenter < Types::BaseObject
      field :id, ID, null: true
      field :name, String, null: true
      field :email, String, null: true
      field :city, String, null: true
      field :country, String, null: true
    end
  end
end
