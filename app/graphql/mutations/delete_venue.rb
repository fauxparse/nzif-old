module Mutations
  class DeleteVenue < BaseMutation
    description 'Delete a venue'
    payload_type Boolean
    null false

    argument :id, ID, required: true

    def resolve(id:)
      ::DeleteVenue.call(
        current_user: current_user,
        venue: ::Venue.find(id),
      ).success?
    end
  end
end
