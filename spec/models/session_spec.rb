require 'rails_helper'

RSpec.describe Session, type: :model do
  subject(:session) { build(:session) }

  it { is_expected.to be_valid }

  describe '#starts_at' do
    it 'must be during the festival' do
      session.starts_at = session.activity.festival.start_date - 1.day
      expect(session).not_to be_valid
      expect(session).to have_exactly(1).error_on :starts_at
    end
  end

  describe '#ends_at' do
    it 'must be after the start time' do
      session.ends_at = session.starts_at - 1.hour

      expect(session).not_to be_valid
      expect(session).to have_exactly(1).error_on :ends_at
    end
  end

  describe '#full?' do
    let(:registration) { create(:registration, festival: session.festival) }

    before do
      session.update!(capacity: 1)
    end

    it 'is true when the last placement is created' do
      expect { ConfirmPlacement.call(session: session, registration: registration) }
        .to change(session, :full?)
        .from(false)
        .to(true)
    end

    it 'is false when the last placement is destroyed' do
      ConfirmPlacement.call(session: session, registration: registration)
      expect(session).to be_full
      expect { RemoveFromSession.call(session: session, registration: registration) }
        .to change(session, :full?)
        .from(true)
        .to(false)
    end

    it do
      ConfirmPlacement.call(session: session, registration: registration)
      RemoveFromSession.call(session: session, registration: registration)
    end

    describe '.presented_by' do
      subject(:sessions) { Session.presented_by(user) }

      let(:user) { create(:user) }
      let!(:presenter) { create(:presenter, activity: session.activity, user: user) }

      it { is_expected.to include(session) }
    end
  end
end
