class DivertStagingEmails
  def self.delivering_email(message)
    unless message.to.all? { |email| admin?(email) }
      message.to = [ENV['DIVERT_EMAILS']]
    end
  end

  def self.admin?(email)
    User.admin.where(email: email).exists?
  end
end

ActionMailer::Base.register_interceptor(DivertStagingEmails) if ENV['DIVERT_EMAILS'].present?
