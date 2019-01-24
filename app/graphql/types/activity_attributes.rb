module Types
  class ActivityAttributes < BaseInputObject
    description 'Attributes for creating or updating an activity'
    argument :name, String, required: false
    argument :slug, String, required: false
    argument :description, String, required: false
    argument :levels, [WorkshopLevel], required: false
    argument :presenters, [UserAttributes], required: false
  end
end
