require 'rails_helper'

RSpec.describe RemoveFromWaitlist, type: :interactor do
  subject(:result) { RemoveFromWaitlist.call(registration: registration, session: session) }

  let(:session) { create(:session) }

  let(:registration) { create(:registration, festival: session.activity.festival) }

  describe '.call' do
    it { is_expected.to be_failure }

    context 'when the user is on the waitlist' do
      before do
        registration.waitlists.create!(session: session)
      end

      it { is_expected.to be_success }

      it 'removes the waitlist' do
        expect { result }.to change(Waitlist, :count).by(-1)
      end

      it 'leaves a trail' do
        expect { result }.to change(History::LeftWaitlist, :count).by(1)
      end
    end

    context 'when the user is not on the waitlist' do
      it { is_expected.to be_failure }

      it 'does not remove the waitlist' do
        expect { result }.not_to change(Waitlist, :count)
      end

      it 'does not leave a trail' do
        expect { result }.not_to change(History::LeftWaitlist, :count)
      end
    end
  end
end
