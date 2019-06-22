require "rails_helper"

RSpec.describe AdminMailer, type: :mailer do
  describe '#pitch_notification' do
    let(:email) { AdminMailer.pitch_notification(pitch) }
    let(:user) { create(:user) }
    let(:pitch) { create(:pitch, user: user) }
    let!(:admin) { create(:admin) }

    it 'has the correct subject' do
      expect(email).to have_subject(/New pitch from #{user.name}/)
    end

    it 'has the correct recipient' do
      expect(email).to deliver_to(%Q("#{admin.name}" <#{admin.email}>))
    end
  end
end
