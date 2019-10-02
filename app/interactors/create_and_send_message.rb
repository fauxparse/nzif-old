class CreateAndSendMessage
  include Interactor::Organizer

  organize(CreateMessage, SendMessage)
end
