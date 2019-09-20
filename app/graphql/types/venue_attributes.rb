module Types
  class VenueAttributes < BaseInputObject
    description 'Attributes for creating or updating a venue'
    argument :name, String, required: false
    argument :address, String, required: false
    argument :latitude, Float, required: false
    argument :longitude, Float, required: false
  end
end
