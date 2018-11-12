require 'rails_helper'

RSpec.describe Show, type: :model do
  describe '.to_param' do
    subject { Show.to_param }

    it { is_expected.to eq 'shows' }
  end
end
