require 'rails_helper'

RSpec.describe Pitch, type: :model do
  subject(:pitch) { build(:pitch) }

  it { is_expected.to be_draft }
end
