require 'rails_helper'
require 'stripe_mock'

RSpec.describe StripeCustomer, type: :model do
  subject(:stripe_customer) { create(:stripe_customer) }

  around do |example|
    StripeMock.start
    example.run
    StripeMock.stop
  end

  it { is_expected.to be_valid }

  context 'when reloaded' do
    it 'retrieves the customer' do
      customer = StripeCustomer.find(stripe_customer.id)
      expect(customer).to be_present
    end
  end
end
