module Types
  class Pitch
    class PresenterAttributes < BaseInputObject
      argument :user_id, ID, required: false
      argument :name, String, required: false
      argument :email, String, required: false
      argument :city, String, required: false
      argument :country, String, required: false
      argument :password, String, required: false
    end
  end
end
