require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { build(:user) }

  it { is_expected.to be_valid }

  it { is_expected.to validate_presence_of(:name) }

  describe '#identities' do
    context 'with errors' do
      before do
        user.identities.build(
          type: 'Identity::Password',
          password: 'good',
          password_confirmation: 'bad'
        )
        user.save
      end

      it { is_expected.to have_exactly(1).error_on(:password_confirmation) }
    end
  end
end
