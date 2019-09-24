module Mutations
  class ResendItinerary < BaseMutation
    description 'Resend an itinerary email'
    payload_type Boolean
    null false

    argument :id, ID, required: true

    def resolve(id:)
      registration = Registration.find(id)
      UserMailer.itinerary(registration).deliver_later
      true
    end
  end
end
