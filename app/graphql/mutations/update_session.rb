module Mutations
  class UpdateSession < BaseMutation
    description 'Update a session'
    payload_type Types::Session
    null false

    argument :id, ID, required: true
    argument :attributes, Types::SessionAttributes, required: true

    def resolve(id:, attributes:)
      ::UpdateSession.call(
        current_user: current_user,
        session: ::Session.find(id),
        attributes: attributes.to_h.symbolize_keys
      ).session
    end
  end
end
