require 'rails_helper'

RSpec.describe Incident, type: :model do
  subject(:incident) { build(:incident, user: user) }

  let(:user) { create(:user) }

  it { is_expected.to be_valid }
  it { is_expected.to be_open }

  context 'when anonymous' do
    let(:user) { nil }

    it { is_expected.to be_valid }
    it { is_expected.to be_open }
  end
end
