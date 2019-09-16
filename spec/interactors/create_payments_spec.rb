require 'rails_helper'
require 'support/example_groups/registration_context'

RSpec.describe CreatePayments, type: :interactor do
  include_context 'registration'

  let(:registration) do
    create(:registration, festival: festival, code_of_conduct_accepted: true).tap do |registration|
      registration.placements.create!(session: sessions[0])
      registration.placements.create!(session: sessions[3])
    end
  end

  context 'when a payment method is not selected' do
    it 'does nothing' do
      expect { result }.not_to change(Payment, :count)
    end
  end

  context 'when a payment method is selected' do
    let(:attributes) do
      {
        payment_method: 'InternetBanking'
      }
    end

    it 'creates a payment' do
      expect { result }.to change(Payment, :count).by(1)
    end

    describe 'the payment' do
      subject(:payment) { result.payment }

      it { is_expected.to be_an_instance_of InternetBanking }

      it { is_expected.to be_pending }

      it 'has the correct amount' do
        expect(payment.amount).to eq Money.new(105_00)
      end

      context 'when there is an existing payment' do
        context 'with a smaller amount' do
          let!(:existing_payment) do
            InternetBanking.create!(registration: registration, amount: Money.new(55_00))
          end

          it 'charges the full amount' do
            expect(payment.amount).to eq Money.new(105_00)
          end

          it 'cancels the existing payment' do
            expect { result }.to change { existing_payment.reload.state }.to 'cancelled'
          end

          context 'that has been approved' do
            before do
              existing_payment.approved!
            end

            it 'charges the difference' do
              expect(payment.amount).to eq Money.new(50_00)
            end
          end
        end

        context 'with the correct amount' do
          let!(:existing_payment) do
            InternetBanking.create!(registration: registration, amount: Money.new(105_00))
          end

          it 'does not create a new payment' do
            expect { result }.not_to change(Payment, :count)
            expect(payment).to eq existing_payment
            expect(existing_payment.reload).not_to be_cancelled
          end
        end
      end
    end
  end
end