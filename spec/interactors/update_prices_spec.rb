require 'rails_helper'

RSpec.describe UpdatePrices, type: :interactor do
  subject(:result) do
    UpdatePrices.call(festival: festival, prices: prices, current_user: admin)
  end

  let(:festival) { create(:festival) }
  let(:admin) { create(:admin) }

  describe '.call' do
    context 'when adding prices' do
      let(:prices) { [5500, 11000] }

      it { is_expected.to be_success }

      it 'creates the prices' do
        expect { result }.to change(festival.prices, :count).from(0).to(2)
      end
    end

    context 'when deleting prices' do
      before do
        create(:price, festival: festival, quantity: 1)
        create(:price, festival: festival, quantity: 2)
      end

      let(:prices) { [] }

      it { is_expected.to be_success }

      it 'deletes the prices' do
        expect { result }.to change(festival.prices, :count).from(2).to(0)
      end
    end

    context 'when changing prices' do
      before do
        create(:price, festival: festival, quantity: 1)
        create(:price, festival: festival, quantity: 2)
      end

      let(:prices) { [12345, 67890] }

      it { is_expected.to be_success }

      it 'does not add or remove the prices' do
        expect { result }.not_to change { festival.prices.pluck(:id) }
      end

      it 'updates the prices' do
        expect { result }
          .to change { festival.prices.pluck(:amount_cents) }
          .from([5000, 5000])
          .to(prices)
      end
    end
  end
end
