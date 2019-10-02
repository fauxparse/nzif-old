class CreateMessage
  include Interactor

  def call
    context.message = messageable.messages.create!(
      sender: sender,
      subject: subject,
      body: body,
    )
  end

  delegate :messageable, :sender, :subject, :body, to: :context
end
