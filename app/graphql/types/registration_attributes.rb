module Types
  class RegistrationAttributes < BaseInputObject
    description 'Attributes for creating or updating a registration'
    argument :state, String, required: false
    argument :name, String, required: false
    argument :city, String, required: false
    argument :email, String, required: false
    argument :password, String, required: false
    argument :password_confirmation, String, required: false
    argument :phone, String, required: false
    argument :code_of_conduct_accepted_at, Types::Time, required: false
    argument :preferences, [Types::PreferenceAttributes], required: false
    argument :workshops, [GraphQL::Types::ID], required: false
    argument :waitlists, [GraphQL::Types::ID], required: false
    argument :availability, [Types::AvailabilityAttributes], required: false
    argument :payment_method, Types::PaymentType, required: false
  end
end
