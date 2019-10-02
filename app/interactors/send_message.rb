class SendMessage < Interaction
  def call
    context.emails = send_messages
  end

  delegate :message, to: :context

  private

  def send_messages
    recipients.map do |recipient|
      UserMailer.broadcast_message(message, recipient).tap(&:deliver_later)
    end
  end

  def recipients
    @recipients ||= context.recipients || message.recipients
  end
end
