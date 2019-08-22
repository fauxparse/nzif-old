module Mutations
  class UpdateRegistration < BaseMutation
    description 'Update a registration'
    payload_type Types::Registration
    null false

    argument :year, ID, required: true
    argument :attributes, Types::RegistrationAttributes, required: true

    def resolve(year:, attributes:)
      result = ::UpdateRegistration.call(
        festival: Festival.find_by(year: year),
        current_user: logged_in? ? current_user : nil,
        attributes: attributes,
      )
      log_in_as(result.user) unless logged_in?
      result.registration
    end
  end
end
