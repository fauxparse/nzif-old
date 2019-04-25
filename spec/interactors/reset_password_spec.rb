require 'rails_helper'
require 'timecop'

RSpec.describe ResetPassword, type: :interactor do
  subject(:result) do
    ResetPassword.call(
      token: token,
      password: password,
      password_confirmation: password_confirmation
    )
  end

  before do
    identity.update!(reset_token: token)
  end

  let(:token) { '0123456789abcdef' }
  let(:user) { create(:user, :with_password) }
  let(:identity) { user.identities.where(type: 'Identity::Password').last }
  let(:password) { 'n3wp4$$w0rd' }
  let(:password_confirmation) { password }

  describe 'for a valid identity' do
    before do
      identity.update!(reset_token: token)
    end

    it 'resets the password' do
      expect(result).to be_success
      expect(identity.reload.authenticate(password)).to eq user
    end
  end

  describe 'with bad password confirmation' do
    let(:password_confirmation) { 'bad' }

    it 'does not reset the password' do
      expect(result).to be_failure
      expect(result.errors[:password_confirmation]).to have_exactly(1).item
    end
  end

  describe 'with a bad token' do
    before do
      identity.update!(reset_token: 'different')
    end

    it 'does not reset the password' do
      expect(result).to be_failure
      expect(result.errors[:token]).to have_exactly(1).item
    end
  end

  describe 'with an expired token' do
    it 'does not reset the password' do
      Timecop.freeze(identity.updated_at + 2.days) do
        expect(result).to be_failure
        expect(result.errors[:token]).to have_exactly(1).item
      end
    end
  end
end
