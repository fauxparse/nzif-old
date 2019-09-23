require 'rails_helper'

RSpec.describe PromoteFromWaitlist, type: :interactor do
  subject(:result) { PromoteFromWaitlist.call(waitlist: waitlist) }

  let(:waitlist) { create(:waitlist, session: session, registration: registration) }
  let(:session) { create(:session, capacity: 1) }
  let(:festival) { session.festival }
  let(:registration) { create(:registration, festival: festival) }

  describe '.call' do
    let(:email) { double('email', deliver_later: true) }

    before do
      allow(UserMailer).to receive(:waitlist_success).and_return(email)
    end

    it 'confirms the placement' do
      expect(ConfirmPlacement).to receive(:call).with(registration: registration, session: session)
      result
    end

    it 'leaves an audit trail' do
      expect { result }.to change(History::JoinedFromWaitlist, :count).by(1)
    end

    it 'sends a confirmation email' do
      expect(UserMailer)
        .to receive(:waitlist_success)
        .with(registration, session)
      result
    end

    context 'when there is a chain reaction' do
      let(:other_session) { create(:session, activity: other_workshop) }
      let(:other_workshop) { create(:workshop, festival: festival) }
      let(:other_registration) { create(:registration, festival: festival) }
      let!(:existing_placement) { registration.placements.create(session: other_session) }
      let!(:existing_waitlist) { other_registration.waitlists.create(session: other_session) }

      it { is_expected.to be_success }

      it 'moves the user out of their existing session' do
        result
        expect(registration.reload.sessions).not_to include other_session
      end

      it 'adds the user to their new session' do
        result
        expect(registration.reload.sessions).to include session
      end

      it 'moves the next person up off the waitlist' do
        result
        expect(other_registration.reload.sessions).to include other_session
      end

      describe 'the audit trail' do
        let(:history) { History::Item.oldest_first.map(&:description) }
        let(:user) { registration.user }
        let(:other_user) { other_registration.user }

        it 'is recorded in the right order' do
          result
          expect(history).to eq [
            "#{user.name} joined #{session} from the waitlist",
            "#{user.name} left #{other_session}",
            "#{other_user.name} joined #{other_session} from the waitlist",
          ]
        end
      end
    end
  end
end
