module Types
  class PreferenceAttributes < Types::BaseInputObject
    argument :session_id, ID, required: true
    argument :position, Integer, required: true
  end
end
