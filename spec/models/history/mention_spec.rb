require 'rails_helper'

RSpec.describe History::Mention, type: :model do
  subject(:mention) { item.mentions.create(subject: user, relationship: 'user') }

  let(:user) { create(:user) }
  let(:item) { History::Item.create! }

  it { is_expected.to be_valid }

  describe '#item' do
    subject { mention.item }

    it { is_expected.to eq item }
  end
end
