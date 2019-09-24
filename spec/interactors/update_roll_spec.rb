require 'rails_helper'

RSpec.describe UpdateRoll, type: :interactor do
  subject(:result) do
    UpdateRoll.call(
      session: session,
      placement_ids: placement_ids,
      waitlist_ids: waitlist_ids,
      current_user: admin,
    ).result
  end

  let(:admin) { create(:admin) }
  let(:session) { create(:session, capacity: 3) }
  let(:festival) { session.festival }
  let(:registrations) { create_list(:registration, 5, festival: festival) }
  let(:ids) { registrations.map(&:to_param) }
  let(:placement_ids) { ids[0, 3] }
  let(:waitlist_ids) { ids[3, 2] }

  def resulting_placements
    session.placements.reject(&:destroyed?).map { |p| p.registration.to_param }
  end

  def resulting_waitlist
    session.waitlists.reject(&:destroyed?).sort_by(&:position).map { |w| w.registration.to_param }
  end

  before do
    session.placements.create(registration: registrations[0])
    session.placements.create(registration: registrations[1])
    session.placements.create(registration: registrations[2])
    session.waitlists.create(registration: registrations[3])
    session.waitlists.create(registration: registrations[4])
    registrations.each(&:reload)
  end

  describe '.call' do
    context 'when changing nothing' do
      it 'does not change' do
        expect(RemoveFromSession).not_to receive(:call)
        expect(ConfirmPlacement).not_to receive(:call)
        expect(AddToWaitlist).not_to receive(:call)
        expect(RemoveFromWaitlist).not_to receive(:call)
        expect(session.reload.placements_count).to eq(3)
        result
      end
    end

    context 'when removing a participant' do
      let(:placement_ids) { ids[1, 2] }

      context 'from a full workshop' do
        it 'calls RemoveFromSession' do
          expect(RemoveFromSession)
            .to receive(:call)
            .with(
              registration: registrations[0],
              session: session,
              current_user: admin,
              bump_waitlist: false
            )
          result
        end

        it 'removes the placement' do
          expect { result }.to change(Placement, :count).by(-1)
        end

        it 'does not bump someone up from the waitlist' do
          expect { result }.not_to change { resulting_waitlist }
        end

        context 'to the bottom of the waitlist' do
          let(:placement_ids) { ids[1, 2] }
          let(:waitlist_ids) { [ids[3], ids[4], ids[0]] }

          it 'performs the correct waitlist moves' do
            expect { result }
              .to change { resulting_waitlist }
              .from(ids[3, 2])
              .to([ids[3], ids[4], ids[0]])
          end
        end

        context 'to the top of the waitlist' do
          let(:placement_ids) { ids[1, 2] }
          let(:waitlist_ids) { [ids[0], ids[3], ids[4]] }

          it 'performs the correct waitlist moves' do
            expect { result }
              .to change { resulting_waitlist }
              .from([ids[3], ids[4]])
              .to([ids[0], ids[3], ids[4]])
          end
        end
      end
    end

    context 'when shuffling the waitlist' do
      let(:waitlist_ids) { [ids[4], ids[3]] }

      it 'updates the order' do
        expect { result }
          .to change { resulting_waitlist }
          .from([ids[3], ids[4]])
          .to([ids[4], ids[3]])
      end

      it 'leaves placements alone' do
        expect { result }.not_to change { resulting_placements }
      end
    end
  end
end
