require 'rails_helper'

RSpec.describe Registration, type: :model do
  subject(:registration) { build(:registration) }

  it { is_expected.to be_valid }

  context '#update' do
    context 'without accepting the code of conduct' do
      before do
        registration.update(code_of_conduct_accepted: true)
        registration.code_of_conduct_accepted = nil
      end

      it { is_expected.not_to be_valid }
    end

    context 'having accepted the code of conduct' do
      before do
        registration.code_of_conduct_accepted = true
      end

      it { is_expected.to be_valid }
    end
  end
end
