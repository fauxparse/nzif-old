require 'rails_helper'

RSpec.describe GeneratePasswordReset, type: :interactor do
  subject(:result) do
    GeneratePasswordReset.call(user: user)
  end

  let(:token) { '0123456789abcdef' }
  let(:identity) { user.identities.where(type: 'Identity::Password').last }
  let(:email) { double('email', deliver_later: true) }

  before do
    allow(SecureRandom).to receive(:hex).and_call_original
    allow(SecureRandom).to receive(:hex).with(32).and_return(token)
    allow(UserMailer).to receive(:password_reset).and_return(email)
  end

  describe 'for a user with an existing password' do
    let(:user) { create(:user, :with_password) }

    it 'generates a reset token' do
      expect { result }
        .to change { identity.reload.reset_token }
        .from(nil)
        .to(token)
    end

    it 'sends a reset email' do
      expect(UserMailer).to receive(:password_reset)
      result
    end
  end

  describe 'for a user without an existing password' do
    let(:user) { create(:user) }

    it 'adds a password identity' do
      expect { result }
        .to change(Identity::Password, :count)
        .by(1)
      expect(identity.reset_token).to eq token
    end
  end
end
