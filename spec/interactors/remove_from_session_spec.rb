require 'rails_helper'

RSpec.describe RemoveFromSession, type: :interactor do
  subject(:result) { RemoveFromSession.call(registration: registration, session: session) }

  let(:session) { create(:session, capacity: 1) }

  let(:festival) { session.activity.festival }

  let(:registration) { create(:registration, festival: festival) }

  describe '.call' do
    it { is_expected.to be_failure }

    context 'when the user is in the session' do
      before do
        registration.placements.create!(session: session)
      end

      it { is_expected.to be_success }

      it 'removes the placement' do
        expect { result }.to change(Placement, :count).by(-1)
      end

      it 'notifies subscribers' do
        expect(NzifSchema.subscriptions)
          .to receive(:trigger)
          .with('sessionChanged', {}, session)
          .and_return true
        result
      end

      context 'and there is a waitlist' do
        let(:waiting) { create(:registration, festival: festival) }

        let!(:waitlist) { waiting.waitlists.create!(session: session) }

        it 'bumps up the next person on the waitlist' do
          expect(PromoteFromWaitlist)
            .to receive(:call)
            .with(waitlist: waitlist, notify_subscribers: false)
          result
        end

        it 'does not notify subscribers' do
          expect(NzifSchema.subscriptions).not_to receive(:trigger)
          result
        end
      end
    end
  end
end
