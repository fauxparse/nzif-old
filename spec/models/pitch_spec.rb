require 'rails_helper'

RSpec.describe Pitch, type: :model do
  subject(:pitch) { build(:pitch) }

  it { is_expected.to be_draft }

  describe '.for_user' do
    subject { Pitch.for_user(user) }

    let(:pitches) { create_list(:pitch, 2, festival: festival) }
    let(:festival) { create(:festival) }

    context 'when user is nil' do
      let(:user) { nil }

      it { is_expected.to include(pitches.first) }
      it { is_expected.to include(pitches.second) }
    end

    context 'when user is given' do
      let(:user) { pitches.first.user }

      it { is_expected.to include(pitches.first) }
      it { is_expected.not_to include(pitches.second) }
    end
  end

  describe '.in_state' do
    subject { Pitch.in_state(state) }

    let(:pitches) { create_list(:pitch, 2, festival: festival) }
    let(:festival) { create(:festival) }

    before do
      pitches.second.submitted!
    end

    context 'when state is nil' do
      let(:state) { nil }

      it { is_expected.to include(pitches.first) }
      it { is_expected.to include(pitches.second) }
    end

    context 'when state is given' do
      let(:state) { 'submitted' }

      it { is_expected.not_to include(pitches.first) }
      it { is_expected.to include(pitches.second) }
    end
  end
end
