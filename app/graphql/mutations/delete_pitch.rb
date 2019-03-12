module Mutations
  class DeletePitch < BaseMutation
    description 'Delete a pitch'
    payload_type Boolean
    null false

    argument :id, ID, required: true

    def resolve(id:)
      ::DeletePitch.call(
        current_user: current_user,
        pitch: Pitch.find_by_hashid(id)
      ).success?
    rescue ActiveRecord::RecordNotFound
      false
    end
  end
end
