module Mutations
  class CreateMessage < BaseMutation
    description 'Create a message'
    payload_type Types::Message
    null false

    argument :messageable_id, GraphQL::Types::ID, required: true
    argument :messageable_type, String, required: true
    argument :subject, String, required: true
    argument :body, String, required: true

    def resolve(messageable_id:, messageable_type:, **attributes)
      messageable = messageable_type.constantize.find(messageable_id)
      ::CreateAndSendMessage
        .call(messageable: messageable, sender: current_user, **attributes)
        .message
    end
  end
end
