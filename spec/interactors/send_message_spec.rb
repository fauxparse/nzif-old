require 'rails_helper'

RSpec.describe SendMessage, type: :interactor do
  subject(:result) { SendMessage.call(message: message) }

  let(:message) { create(:message, messageable: session) }
  let(:session) { create(:session) }
  let(:sender) { create(:admin) }
  let!(:placement) { create(:placement, session: session, registration: registration) }
  let(:registration) { create(:registration, festival: session.festival) }

  describe '.call' do
    it { is_expected.to be_success }

    it 'sends an email' do
      expect(UserMailer)
        .to receive(:broadcast_message)
        .with(message, registration.user)
        .and_call_original
      result
    end
  end
end
