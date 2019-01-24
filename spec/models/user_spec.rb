require 'rails_helper'

RSpec.describe User, type: :model do
  subject(:user) { build(:user) }

  it { is_expected.to be_valid }

  it { is_expected.not_to be_admin }

  context 'with no name' do
    before { user.name = nil }

    it { is_expected.not_to be_valid }
  end

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

  context 'with admin privileges' do
    subject(:user) { build(:admin) }

    it { is_expected.to be_admin }
  end

  describe '#country' do
    subject(:country) { user.country }

    it { is_expected.to be_nil }

    context 'when set with a country code' do
      let(:user) { build(:user, country_code: 'nz') }

      it { is_expected.to eq 'New Zealand' }
    end

    context 'with a bad country code' do
      let(:user) { build(:user, country_code: 'zz') }

      it 'is invalid' do
        expect(user).not_to be_valid
        expect(user).to have_exactly(1).error_on(:country)
      end
    end
  end
end
