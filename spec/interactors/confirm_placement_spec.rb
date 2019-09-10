require 'rails_helper'

RSpec.describe ConfirmPlacement, type: :interactor do
  subject(:result) { ConfirmPlacement.call(registration: registration, session: session) }

  let(:session) { create(:session, activity: workshop) }
  let(:workshop) { create(:workshop, festival: festival) }
  let(:registration) { create(:registration, festival: festival) }
  let(:festival) { create(:festival) }

  describe '.call' do
    it { is_expected.to be_success }

    it 'creates a placement' do
      expect { result }.to change(Placement, :count).by(1)
    end

    context 'when the user is on the waitlist' do
      before do
        AddToWaitlist.call(registration: registration, session: session)
      end

      it 'removes the waitlist entry' do
        expect { result }.to change(Waitlist, :count).by(-1)
      end
    end

    context 'with preferential registration' do
      let(:workshops) { create_list(:workshop, 3, festival: festival) }

      let(:sessions) do
        workshops.map { |workshop| create(:session, activity: workshop, capacity: 1) }
      end

      before do
        sessions.each.with_index do |session|
          registration.preferences.create!(session: session)
          registration.waitlists.create!(session: session)
        end
      end

      context 'getting their first choice' do
        let(:session) { sessions.first }

        it 'deletes all three waitlists' do
          expect { result }.to change(Waitlist, :count).from(3).to(0)
        end
      end

      context 'getting their second choice' do
        let(:session) { sessions.second }

        it 'leaves the higher priority waitlist' do
          expect { result }.to change(Waitlist, :count).from(3).to(1)
          expect(registration.waitlists.where(session: sessions.first)).to exist
        end
      end

      context 'getting their third choice' do
        let(:session) { sessions.third }

        it 'leaves the higher priority waitlists' do
          expect { result }.to change(Waitlist, :count).from(3).to(2)
          expect(registration.waitlists.where(session: sessions.first)).to exist
          expect(registration.waitlists.where(session: sessions.second)).to exist
        end
      end

      context 'when they’re already in a session' do
        let(:session) { sessions.second }

        before do
          registration.placements.create!(session: sessions.third)
          registration.waitlists.where(session: sessions.third).destroy_all
        end

        it 'leaves them on the waitlist for their first choice' do
          expect { result }.to change(Waitlist, :count).from(2).to(1)
          expect(registration.waitlists.where(session: sessions.first)).to exist
        end

        it 'swaps them from one session to the other' do
          expect(registration.placements.where(session: sessions.third)).to exist
          expect(registration.placements.where(session: sessions.second)).not_to exist
          expect { result }.not_to change(Placement, :count)
          expect(registration.placements.where(session: sessions.second)).to exist
          expect(registration.placements.where(session: sessions.third)).not_to exist
        end
      end
    end
  end
end
