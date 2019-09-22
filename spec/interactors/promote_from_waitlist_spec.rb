require 'rails_helper'

RSpec.describe PromoteFromWaitlist, type: :interactor do
  subject(:result) { PromoteFromWaitlist.call(waitlist: waitlist) }

  let(:waitlist) { create(:waitlist, session: session, registration: registration) }
  let(:session) { create(:session) }
  let(:registration) { create(:registration, festival: session.festival) }

  describe '.call' do
    it 'confirms the placement' do
      expect(ConfirmPlacement).to receive(:call).with(registration: registration, session: session)
      result
    end

    it 'leaves an audit trail' do
      expect { result }.to change(History::WaitlistFilled, :count).by(1)
    end
  end
end
