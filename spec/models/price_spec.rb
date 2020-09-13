require 'rails_helper'

RSpec.describe Price, type: :model do
  subject(:price) { build(:price, festival: festival) }
  let(:festival) { create(:festival) }

  it { is_expected.to be_valid }

  it 'must be unique by quantity' do
    create(:price, festival: festival)
    expect(price).not_to be_valid
    expect(price).to have_exactly(1).error_on(:quantity)
  end

  it 'must belong to a festival' do
    price.festival = nil
    expect(price).not_to be_valid
    expect(price).to have_exactly(1).error_on(:festival)
  end

  it 'must have quantity > 0' do
    price.quantity = 0
    expect(price).not_to be_valid
    expect(price).to have_exactly(1).error_on(:quantity)
  end

  it 'must have amount >= 0' do
    price.amount_cents = -1
    expect(price).not_to be_valid
    expect(price).to have_exactly(1).error_on(:amount_cents)
  end

  it 'must have an activity type' do
    price.activity_type = nil
    expect(price).not_to be_valid
    expect(price).to have_exactly(1).error_on(:activity_type)
  end
end
