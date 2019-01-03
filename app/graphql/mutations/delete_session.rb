module Mutations
  class DeleteSession < BaseMutation
    description 'Delete a session'
    payload_type Boolean
    null false

    argument :id, ID, required: true

    def resolve(id:)
      ::DeleteSession.call(session: Session.find(id)).success?
    rescue ActiveRecord::RecordNotFound
      false
    end
  end
end
