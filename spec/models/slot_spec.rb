require 'rails_helper'

RSpec.describe Slot, type: :model do
  subject(:slot) { build(:slot) }

  it { is_expected.to be_valid }
end
