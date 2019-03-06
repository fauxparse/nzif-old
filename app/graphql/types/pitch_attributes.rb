module Types
  class PitchAttributes < BaseInputObject
    description 'Attributes for a pitch'
    argument :id, ID, required: false
    argument :presenters, [Types::Pitch::PresenterAttributes], required: false
    argument :bio, String, required: false
    argument :company, String, required: false
    argument :bio, String, required: false
    argument :availability, String, required: false
    argument :presented_before, String, required: false
    argument :code_of_conduct, Boolean, required: false
  end
end
