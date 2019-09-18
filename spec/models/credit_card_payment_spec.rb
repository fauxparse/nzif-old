require 'rails_helper'
require 'stripe_mock'

RSpec.describe CreditCardPayment, type: :model do
  around do |example|
    StripeMock.start
    example.run
    StripeMock.stop
  end

  subject(:payment) { CreditCardPayment.create!(registration: registration, amount: 100_00) }

  let(:registration) { create(:registration) }

  describe '.create' do
    it { is_expected.to be_valid }

    it 'has a reference' do
      expect(payment.reference).to be_present
    end

    it 'creates a Stripe customer for the user' do
      expect { payment }.to change { registration.user.stripe_customer.present? }.from(false).to(true)
      expect(StripeCustomer.count).to eq 1
    end
  end
end