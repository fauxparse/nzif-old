require 'rails_helper'

RSpec.describe ApprovePayment, type: :interactor do
  subject(:result) { ApprovePayment.call(payment: payment) }

  let(:payment) { create(:payment) }

  describe '.call' do
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
