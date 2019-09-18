require 'rails_helper'
require 'stripe_mock'

RSpec.describe StripeCustomer, type: :model do
  subject { create(:stripe_customer) }

  around do |example|
    StripeMock.start
    example.run
    StripeMock.stop
  end

  it { is_expected.to be_valid }
end
