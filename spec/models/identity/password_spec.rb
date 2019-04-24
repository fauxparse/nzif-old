require 'rails_helper'
require 'timecop'

RSpec.describe Identity::Password, type: :model do
  subject(:identity) { build(:password, password: password, user: user) }

  let(:user) { create(:user) }
  let(:password) { 'P4$$w0rd' }

  describe '#authenticate' do
    subject { identity.authenticate(password_attempt) }

    before { identity.save! }

    context 'with correct password' do
      let(:password_attempt) { password }

      it { is_expected.to eq user }
    end

    context 'with incorrect password' do
      let(:password_attempt) { 'iloveyou' }

      it { is_expected.to be false }
    end
  end

  describe '#type' do
    let(:user) { create(:user, :with_password) }

    it 'is unique' do
      expect(identity).not_to be_valid
    end

    context 'when the user has a different identity type' do
      let(:user) do
        create(:user).tap do |user|
          Identity::Google.create!(user: user, uid: '12345678')
        end
      end

      it 'is totally fine' do
        expect(identity).to be_valid
      end
    end
  end

  describe '#reset_token' do
    before do
      identity.update!(reset_token: '0123456789abcdef')
    end

    it 'has not expired' do
      expect(identity.reset_token_expired?).to be false
    end

    describe 'generated two days ago' do
      it 'has expired' do
        Timecop.freeze(Time.now + 2.days) do
          expect(identity.reset_token_expired?).to be true
        end
      end
    end
  end
end
