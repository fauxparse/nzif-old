module Types
  class UserAttributes < BaseInputObject
    description 'Attributes for a user'
    argument :id, ID, required: false
    argument :name, String, required: false
    argument :email, String, required: false
  end
end
