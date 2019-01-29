module Mutations
  class CreateSession < BaseMutation
    description 'Create a session'
    payload_type Types::Session
    null false

    argument :attributes, Types::SessionAttributes, required: true

    def resolve(attributes:)
      ::CreateSession.call(
        current_user: current_user,
        attributes: attributes.to_h.symbolize_keys
      ).session
    end
  end
end
