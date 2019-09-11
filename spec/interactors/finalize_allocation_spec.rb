require 'rails_helper'

RSpec.describe FinalizeAllocation, type: :interactor do
  subject(:result) { FinalizeAllocation.call(festival: festival, lists: lists) }

  let(:festival) { create(:festival) }
  let(:workshops) { create_list(:workshop, 6, festival: festival) }
  let(:sessions) do
    workshops.map.with_index do |workshop, i|
      create(
        :session,
        activity: workshop,
        starts_at: (festival.start_date + i / 3).midnight + 10.hours,
        capacity: 1,
      )
    end
  end
  let(:registrations) { create_list(:registration, 4, festival: festival) }

  let(:preferences) do
    {
      registrations[0] => sessions,
      registrations[1] => sessions,
      registrations[2] => sessions,
      registrations[3] => sessions[0, 3],
    }
  end

  def waitlisted(registration)
    Waitlist.includes(:session).where(registration: registration).map(&:session)
  end

  def placed(registration)
    Placement.includes(:session).where(registration: registration).map(&:session)
  end

  before do
    preferences.each_pair do |registration, sessions|
      sessions.each { |s| registration.preferences.create!(session: s) }
    end
  end

  describe '.call' do
    let(:lists) do
      {
        sessions[0].id => [registrations[0].id],
        sessions[1].id => [registrations[1].id],
        sessions[2].id => [registrations[2].id],
        sessions[3].id => [registrations[2].id],
        sessions[4].id => [registrations[1].id],
        sessions[5].id => [registrations[0].id],
      }
    end

    it 'locks the allocation' do
      expect { result }.to change { festival.reload.allocation_finalized? }.from(false).to(true)
    end

    it 'creates six placements' do
      expect { result }.to change(Placement, :count).by(6)
    end

    context 'for user #1' do
      before { result }

      it 'creates the correct placements' do
        expect(placed(registrations[0])).to contain_exactly(sessions[0], sessions[5])
      end

      it 'creates the correct waitlist entries' do
        expect(waitlisted(registrations[0])).to contain_exactly(sessions[3], sessions[4])
      end
    end

    context 'for user #2' do
      before { result }

      it 'creates the correct placements' do
        expect(placed(registrations[1])).to contain_exactly(sessions[1], sessions[4])
      end

      it 'creates the correct waitlist entries' do
        expect(waitlisted(registrations[1])).to contain_exactly(sessions[0], sessions[3])
      end
    end

    context 'for user #3' do
      before { result }

      it 'creates the correct placements' do
        expect(placed(registrations[2])).to contain_exactly(sessions[2], sessions[3])
      end

      it 'creates the correct waitlist entries' do
        expect(waitlisted(registrations[2])).to contain_exactly(sessions[0], sessions[1])
      end
    end

    context 'for user #4' do
      before { result }

      it 'creates no placements' do
        expect(placed(registrations[3])).to be_empty
      end

      it 'creates the correct waitlist entries' do
        expect(waitlisted(registrations[3])).to contain_exactly(*sessions[0, 3])
      end

      it 'is at the top of the waitlists' do
        expect(registrations[3].waitlists.pluck(:position)).to eq([1, 1, 1])
      end
    end

    it 'sorts the waitlists by who missed out the most' do
      result
      expect(sessions.first.waitlists.pluck(:registration_id))
        .to eq([registrations[3].id, registrations[2].id, registrations[1].id])
    end
  end
end
