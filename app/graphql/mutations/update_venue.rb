module Mutations
  class UpdateVenue < BaseMutation
    description 'Update a venue'
    payload_type Types::Venue
    null false

    argument :id, ID, required: true
    argument :attributes, Types::VenueAttributes, required: true

    def resolve(id:, attributes:)
      ::UpdateVenue.call(
        current_user: current_user,
        venue: ::Venue.find(id),
        attributes: attributes.to_h.symbolize_keys
      ).venue
    end
  end
end
