module Mutations
  class UpdateRegistration < BaseMutation
    description 'Update a registration'
    payload_type Types::Registration
    null false

    argument :year, ID, required: true
    argument :id, ID, required: false
    argument :attributes, Types::RegistrationAttributes, required: true

    def resolve(year:, id: nil, attributes:)
      festival = Festival.by_year(year).first
      registration = id && festival.registrations.with_user.with_preferences.find_by_hashid(id)

      result = ::UpdateRegistration.call(
        festival: festival,
        current_user: logged_in? ? current_user : nil,
        registration: registration,
        attributes: attributes.to_h,
      )

      raise ActiveModel::ValidationError, result if result.failure?
      log_in_as(result.user) unless logged_in?
      result.registration
    end
  end
end
