module Types
  class SessionAttributes < BaseInputObject
    description 'Attributes for creating or updating a session'
    argument :starts_at, Types::Time, required: false
    argument :ends_at, Types::Time, required: false
    argument :activity_id, ID, required: false
    argument :venue_id, ID, required: false
  end
end
