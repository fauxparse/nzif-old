require 'rails_helper'

RSpec.describe CreateAndSendMessage, type: :interactor do
  subject(:result) { CreateAndSendMessage.call(**parameters) }

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
    describe '#emails' do
      subject(:email) { result.emails.first }

      it { is_expected.to have_subject('NZIF: message subject') }
    end
  end
end
