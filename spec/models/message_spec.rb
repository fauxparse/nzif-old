require 'rails_helper'

RSpec.describe Message, type: :model do
  subject(:message) { create(:message) }

  it { is_expected.to be_valid }
end
