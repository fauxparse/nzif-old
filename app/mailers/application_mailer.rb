class ApplicationMailer < ActionMailer::Base
  helper MailerHelper

  default from: 'registrations@improvfest.nz'
  layout 'mailer'

  private

  def recipient(user)
    Mail::Address.new.tap do |email|
      email.display_name = user.name
      email.address = user.email
    end
  end
end
