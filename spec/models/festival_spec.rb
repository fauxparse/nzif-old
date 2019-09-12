require 'rails_helper'
require 'timecop'

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

  describe '#allocation_finalized?' do
    subject { festival.allocation_finalized? }

    it { is_expected.to be false }

    context 'when allocation is finalized' do
      it 'is true' do
        expect { festival.finalize_allocation! }
          .to change(festival, :allocation_finalized?)
          .from(false)
          .to(true)
      end
    end
  end

  shared_context 'festival timing' do
    let(:start) { festival.start_date.midnight }

    around do |example|
      festival.pitches_open_at = start - 4.months
      festival.pitches_close_at = start - 3.months
      festival.registrations_open_at = start - 2.months
      festival.earlybird_cutoff = start - 1.month
      festival.allocation_finalized_at = festival.earlybird_cutoff + 1.week

      Timecop.freeze(now) do
        example.run
      end
    end
  end

  describe '#registrations_open?' do
    subject { festival.registrations_open? }

    include_context 'festival timing'

    context 'before registrations_open' do
      let(:now) { festival.registrations_open_at - 1.day }

      it { is_expected.to be false }
    end

    context 'after registrations_open' do
      let(:now) { festival.registrations_open_at + 1.day }

      it { is_expected.to be true }
    end

    context 'after earlybird registrations close' do
      let(:now) { festival.earlybird_cutoff + 1.day }

      it { is_expected.to be false }
    end

    context 'after allocations are finalized' do
      let(:now) { festival.allocation_finalized_at + 1.day }

      it { is_expected.to be true }
    end

    context 'after the festival' do
      let(:now) { festival.end_date.midnight + 1.day }

      it { is_expected.to be false }
    end
  end

  describe '#state' do
    subject(:state) { festival.state }

    include_context 'festival timing'

    context 'before pitches open' do
      let(:now) { festival.pitches_open_at - 1.week }

      it { is_expected.to eq 'pending' }
    end

    context 'after pitches open' do
      let(:now) { festival.pitches_open_at + 1.week }

      it { is_expected.to eq 'pitching' }
    end

    context 'after pitches close' do
      let(:now) { festival.pitches_close_at + 1.day }

      it { is_expected.to eq 'programming' }
    end

    context 'during earlybird registration' do
      let(:now) { festival.registrations_open_at + 1.day }

      it { is_expected.to eq 'earlybird' }
    end

    context 'between earlybird and general registration' do
      let(:now) { festival.earlybird_cutoff + 1.day }

      it { is_expected.to eq 'allocating' }
    end

    context 'during general registration' do
      let(:now) { start - 1.week }

      it { is_expected.to eq 'registration' }
    end

    context 'after the festival' do
      let(:now) { start + 1.month }

      it { is_expected.to eq 'finished' }
    end
  end

  describe '#deadline' do
    subject(:deadline) { festival.deadline }

    include_context 'festival timing'

    context 'during pitching' do
      let(:now) { festival.pitches_open_at + 1.day }

      it { is_expected.to eq festival.pitches_close_at }
    end

    context 'during earlybird registration' do
      let(:now) { festival.registrations_open_at + 1.day }

      it { is_expected.to eq festival.earlybird_cutoff }
    end

    context 'during general registration' do
      let(:now) { festival.allocation_finalized_at + 1.day }

      context 'when there is an opening night show' do
        let(:show_time) { festival.start_date.midnight.change(hour: 18, minute: 30) }

        let!(:show) do
          create(:show, festival: festival) do |show|
            create(:session, activity: show, starts_at: show_time)
          end
        end

        it { is_expected.to eq show_time }
      end

      context 'otherwise' do
        it { is_expected.to eq start }
      end
    end

    context 'at other times' do
      let(:now) { festival.end_date.midnight + 1.week }

      it { is_expected.to be_nil }
    end
  end

  describe '#days' do
    subject(:days) { festival.days }

    it { is_expected.to have_exactly(8).items }
  end
end
