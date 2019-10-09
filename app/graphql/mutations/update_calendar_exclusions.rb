module Mutations
  class UpdateCalendarExclusions < BaseMutation
    payload_type [ID]
    null false

    argument :registration_id, ID, required: true
    argument :ids, [ID], required: true

    def resolve(registration_id:, ids:)
      ::UpdateCalendarExclusions.call(
        current_user: current_user,
        registration: ::Registration.find(registration_id),
        excluded_ids: ids.map { |id| Session.decode_id(id) }
      )
      ids
    end
  end
end
