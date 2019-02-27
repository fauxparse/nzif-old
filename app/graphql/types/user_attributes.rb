module Types
  class UserAttributes < BaseInputObject
    description 'Attributes for a user'
    argument :id, ID, required: false
    argument :name, String, required: false
    argument :email, String, required: false
    argument :image, String, required: false
    argument :roles, [UserRole], required: false
  end
end
