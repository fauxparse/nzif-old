module Mutations
  class UpdateRegistration < BaseMutation
    description 'Update a registration'
    payload_type Types::Registration
    null false

    argument :year, ID, required: true
    argument :attributes, Types::RegistrationAttributes, required: true

    def resolve(year:, attributes:)
      Rails.logger.info(attributes.to_h.inspect)
      result = ::UpdateRegistration.call(
        festival: Festival.by_year(year).first,
        current_user: logged_in? ? current_user : nil,
        attributes: attributes.to_h,
      )
      raise ActiveModel::ValidationError.new(result) if result.failure?
      log_in_as(result.user) unless logged_in?
      result.registration
    end
  end
end
