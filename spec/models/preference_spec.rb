require 'rails_helper'

RSpec.describe Preference, type: :model do
  subject!(:preference) { create(:preference, session: session, registration: registration) }

  let(:festival) { workshop.festival }
  let(:registration) { create(:registration, festival: festival) }
  let(:workshop) { create(:workshop) }
  let(:session) { create(:session, activity: workshop) }

  it { is_expected.to be_valid }

  describe '#position' do
    subject(:position) { preference.position }

    it { is_expected.to eq 1 }
  end

  describe '#session' do
    it 'is unique per registration' do
      second = registration.preferences.build(session: session)
      expect(second).not_to be_valid
    end
  end

  describe '#starts_at' do
    subject(:starts_at) { preference.starts_at }

    it { is_expected.to eq session.starts_at }

    context 'when the session is updated' do
      before do
        preference.save
      end

      def shift_session
        session.update!(starts_at: session.starts_at + 1.day, ends_at: session.ends_at + 1.day)
      end

      it 'is updated to match' do
        expect { shift_session }.to change { preference.reload.starts_at }.by(1.day)
      end
    end
  end
end
