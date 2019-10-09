require 'rails_helper'

RSpec.describe UpdateCalendarExclusions, type: :interactor do
  subject(:result) do
    UpdateCalendarExclusions.call(
      registration: registration,
      excluded_ids: excluded_ids,
      current_user: registration.user
    )
  end

  describe '.call' do
    let(:festival) { create(:festival) }
    let(:registration) { create(:registration, festival: festival) }
    let(:workshops) { create_list(:workshop, 3, festival: festival) }
    let!(:sessions) do
      workshops.map { |workshop| create(:session, activity: workshop) }
    end

    context 'when adding exclusions' do
      let(:excluded_ids) { sessions.map(&:id) }

      it 'creates the exclusions' do
        expect { result }.to change { registration.calendar_exclusions.count }.by(sessions.size)
      end
    end

    context 'when removing exclusions' do
      let(:excluded_ids) { [sessions.first.id] }

      before do
        sessions.each { |s| registration.calendar_exclusions.create!(session: s) }
      end

      it 'removes the exclusions' do
        expect { result }.to change { registration.calendar_exclusions.count }.by(1 - sessions.size)
      end
    end

    context 'when changing exclusions' do
      let(:excluded_ids) { [sessions.second.id] }

      before do
        registration.calendar_exclusions.create!(session: sessions.first)
      end

      it 'removes the exclusions' do
        expect { result }
          .to change { registration.calendar_exclusions.reload.map(&:session) }
          .from([sessions.first])
          .to([sessions.second])
      end
    end
  end
end
