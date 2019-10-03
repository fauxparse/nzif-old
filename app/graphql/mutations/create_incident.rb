module Mutations
  class CreateIncident < BaseMutation
    description 'Create an incident'
    payload_type Types::Incident
    null false

    argument :year, ID, required: true
    argument :body, String, required: true
    argument :anonymous, Boolean, required: false

    def resolve(year:, body:, anonymous:)
      ::CreateIncident.call(
        current_user: current_user,
        festival: festival_by_year(year),
        body: body,
        anonymous: anonymous.present?,
      ).incident
    end
  end
end
