require 'rails_helper'

RSpec.describe UpdatePayment, type: :interactor do
  subject(:result) do
    UpdatePayment.call(payment: payment, attributes: attributes, current_user: admin)
  end

  let(:payment) { create(:payment) }
  let(:admin) { create(:admin) }

  describe '.call' do
    context 'when approving a payment' do
      let(:attributes) { { state: 'approved' } }

      it { is_expected.to be_success }

      it 'approves the payment' do
        expect { result }.to change(payment, :state).from('pending').to('approved')
      end

      it 'sends a confirmation email' do
        expect(UserMailer).to receive(:payment_confirmation).with(payment).and_call_original
        result
      end
    end
  end
end
