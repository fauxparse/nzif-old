require 'rails_helper'

RSpec.describe CreateMessage, type: :interactor do
  subject(:result) { CreateMessage.call(**parameters) }

  let(:parameters) do
    {
      messageable: session,
      sender: sender,
      subject: 'message subject',
      body: 'important information',
    }
  end

  let(:session) { create(:session) }
  let(:sender) { create(:admin) }
  let!(:placement) { create(:placement, session: session, registration: registration) }
  let(:registration) { create(:registration, festival: session.festival) }

  describe '.call' do
    it 'creates a Message' do
      expect { result }.to change(Message, :count).by(1)
    end

    describe('#message') do
      subject(:message) { result.message }

      its(:sender) { is_expected.to eq sender }
      its(:recipients) { is_expected.to include registration.user }
      its(:subject) { is_expected.to eq 'message subject' }
      its(:body) { is_expected.to eq 'important information' }
    end
  end
end
