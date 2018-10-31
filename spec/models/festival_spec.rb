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
end
