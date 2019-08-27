require "rails_helper"

RSpec.describe UserMailer, type: :mailer do
  describe '#password_reset' do
    let(:email) { UserMailer.password_reset(identity) }
    let(:user) { create(:user, :with_password) }
    let(:identity) { user.identities.first }
    let(:token) { '0123456789abcdef' }

    before do
      identity.update(reset_token: token)
    end

    it 'has the correct subject' do
      expect(email).to have_subject(/Reset your NZIF password/)
    end

    it 'has the correct recipient' do
      expect(email).to deliver_to(%Q("#{user.name}" <#{user.email}>))
    end
  end

  describe '#registration_confirmation' do
    let(:email) { UserMailer.registration_confirmation(registration) }
    let(:registration) { create(:registration) }
    let(:user) { registration.user }

    it 'has the correct subject' do
      expect(email).to have_subject(/Your NZIF #{registration.festival.year} registration/)
    end

    it 'has the correct recipient' do
      expect(email).to deliver_to(%Q("#{user.name}" <#{user.email}>))
    end
  end
end
