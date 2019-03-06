module Types
  class Pitch
    class PresenterAttributes < BaseInputObject
      argument :id, ID, required: false
      argument :name, String, required: false
      argument :email, String, required: false
      argument :city, String, required: false
      argument :country, String, required: false
    end
  end
end
