require 'rails_helper'

RSpec.describe Identity::Password, type: :model do
  subject(:identity) { create(:password, password: password, user: user) }

  let(:user) { create(:user) }
  let(:password) { 'P4$$w0rd' }

  describe '#authenticate' do
    subject { identity.authenticate(password_attempt) }

    context 'with correct password' do
      let(:password_attempt) { password }

      it { is_expected.to eq user }
    end

    context 'with incorrect password' do
      let(:password_attempt) { 'iloveyou' }

      it { is_expected.to be false }
    end
  end
end
