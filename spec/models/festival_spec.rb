require 'rails_helper'

RSpec.describe Festival, type: :model do
  subject(:festival) { build(:festival) }

  it { is_expected.to be_valid }

  context 'with start > end' do
    before { festival.start_date = festival.end_date + 1 }

    it { is_expected.not_to be_valid }
  end

  describe '#to_param' do
    subject { festival.to_param }

    it { is_expected.to eq '2018' }
  end

  describe '#pitches_open?' do
    subject { festival.pitches_open? }

    it { is_expected.to be false }

    context 'when pitches open in the future' do
      before { festival.pitches_open_at = Time.now + 1.day }

      it { is_expected.to be false }
    end

    context 'when pitches have opened' do
      before { festival.pitches_open_at = Time.now - 1.week }

      it { is_expected.to be true }

      context 'and not yet closed' do
        before { festival.pitches_close_at = Time.now + 1.week }

        it { is_expected.to be true }
      end

      context 'and closed' do
        before { festival.pitches_close_at = Time.now - 1.day }

        it { is_expected.to be false }
      end
    end
  end

  describe '#earlybird?' do
    subject { festival.earlybird? }

    it { is_expected.to be false }

    context 'when registrations will open tomorrow' do
      before { festival.registrations_open_at = Time.now + 1.day }

      it { is_expected.to be false }
    end

    context 'when registrations opened last week' do
      before { festival.registrations_open_at = Time.now - 1.week }

      it { is_expected.to be true }
    end
  end
end
