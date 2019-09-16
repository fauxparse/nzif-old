require 'rails_helper'

RSpec.describe Payment, type: :model do
  subject(:payment) { build(:payment) }

  it { is_expected.to be_valid }
  it { is_expected.to be_pending }

  describe '#amount' do
    subject(:amount) { payment.amount }

    it { is_expected.to be_an_instance_of Money }
  end
end
