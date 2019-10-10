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

  describe '#ticket_code' do
    let(:email) { UserMailer.ticket_code(registration) }
    let(:registration) { create(:registration) }
    let(:user) { registration.user }

    it 'has the correct subject' do
      expect(email).to have_subject(/Your NZIF #{registration.festival.year} discount code/)
    end

    it 'has the correct recipient' do
      expect(email).to deliver_to(%Q("#{user.name}" <#{user.email}>))
    end
  end

  describe '#itinerary' do
    let(:email) { UserMailer.itinerary(registration) }
    let(:registration) { create(:registration, :complete) }
    let(:user) { registration.user }

    it 'has the correct subject' do
      expect(email).to have_subject(/Your NZIF #{registration.festival.year} itinerary/)
    end

    it 'has the correct recipient' do
      expect(email).to deliver_to(%Q("#{user.name}" <#{user.email}>))
    end
  end

  describe '#waitlist_success' do
    let(:email) { UserMailer.waitlist_success(registration, session) }
    let(:registration) { create(:registration, :complete) }
    let(:festival) { registration.festival }
    let(:workshop) { create(:workshop, festival: festival) }
    let(:session) { create(:session, activity: workshop) }
    let(:user) { registration.user }

    it 'has the correct subject' do
      expect(email).to have_subject(/You’re in!/)
    end

    it 'has the correct recipient' do
      expect(email).to deliver_to(%Q("#{user.name}" <#{user.email}>))
    end
  end

  describe '#payment_confirmation' do
    let(:email) { UserMailer.payment_confirmation(payment) }
    let(:registration) { create(:registration, :complete) }
    let(:payment) { create(:payment, registration: registration, state: 'approved') }
    let(:user) { registration.user }

    it 'has the correct subject' do
      expect(email).to have_subject(/Thanks for your payment/)
    end

    it 'has the correct recipient' do
      expect(email).to deliver_to(%Q("#{user.name}" <#{user.email}>))
    end
  end

  describe '#broadcast_message' do
    let(:email) { UserMailer.broadcast_message(message, user) }
    let(:user) { create(:user) }
    let(:message) { create(:message) }

    it 'has the correct subject' do
      expect(email).to have_subject(/NZIF: #{message.subject}/)
    end

    it 'has the correct recipient' do
      expect(email).to deliver_to(%Q("#{user.name}" <#{user.email}>))
    end
  end

  describe '#feedback_request' do
    let(:email) { UserMailer.feedback_request(session, user) }
    let(:user) { create(:user) }
    let(:session) { create(:session) }

    it 'has the correct subject' do
      expect(email).to have_subject(/Workshop feedback/)
    end

    it 'has the correct recipient' do
      expect(email).to deliver_to(%Q("#{user.name}" <#{user.email}>))
    end
  end
end
