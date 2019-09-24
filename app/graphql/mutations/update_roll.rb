module Mutations
  class UpdateRoll < BaseMutation
    description 'Update a session’s roll'
    payload_type Types::Session
    null false

    argument :id, ID, required: true
    argument :placements, [ID], required: true
    argument :waitlist, [ID], required: true

    def resolve(id:, placements:, waitlist:)
      ::UpdateRoll.call(
        current_user: current_user,
        session: ::Session.with_roll.find(id),
        placement_ids: placements,
        waitlist_ids: waitlist,
      ).session
    end
  end
end
