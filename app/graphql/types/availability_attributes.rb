module Types
  class AvailabilityAttributes < Types::BaseInputObject
    argument :session_id, ID, required: true
    argument :role, String, required: true
  end
end
