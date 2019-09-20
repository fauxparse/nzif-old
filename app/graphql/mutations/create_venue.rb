module Mutations
  class CreateVenue < BaseMutation
    description 'Create a venue'
    payload_type Types::Venue
    null false

    argument :attributes, Types::VenueAttributes, required: true

    def resolve(attributes:)
      ::UpdateVenue.call(
        current_user: current_user,
        venue: ::Venue.new,
        attributes: attributes.to_h.symbolize_keys
      ).venue
    end
  end
end
