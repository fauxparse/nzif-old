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
end
