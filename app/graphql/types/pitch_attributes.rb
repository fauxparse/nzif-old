module Types
  class PitchAttributes < BaseInputObject
    description 'Attributes for a pitch'
    argument :id, ID, required: false
    argument :presenters, [Types::Pitch::PresenterAttributes], required: false
    argument :state, String, required: false
    argument :name, String, required: false
    argument :bio, String, required: false
    argument :company, String, required: false
    argument :bio, String, required: false
    argument :availability, String, required: false
    argument :presented_before, String, required: false
    argument :nz_based, Boolean, required: false
    argument :payment, Boolean, required: false
    argument :transport, Boolean, required: false
    argument :expenses, Boolean, required: false
    argument :code_of_conduct, Boolean, required: false
    argument :activity_type, String, required: false
    argument :workshop_description, String, required: false
    argument :workshop_reason, String, required: false
    argument :workshop_requirements, String, required: false
    argument :workshop_tech, String, required: false
    argument :activity_levels, [Types::WorkshopLevel], required: false
    argument :participant_count, Integer, required: false
    argument :taught_before, String, required: false
    argument :teens, Boolean, required: false
    argument :other_info, String, required: false
    argument :show_description, String, required: false
    argument :show_details, String, required: false
    argument :show_why, String, required: false
    argument :show_tech, String, required: false
    argument :cast_size, Integer, required: false
    argument :performed_before, String, required: false
    argument :casting, String, required: false
    argument :cast_details, String, required: false
    argument :cast_requirements, String, required: false
    argument :experience, String, required: false
    argument :accessibility, String, required: false
    argument :slots, [Types::Time], required: false
    argument :pile, String, required: false
    argument :gender, String, required: false
    argument :origin, String, required: false
  end
end
