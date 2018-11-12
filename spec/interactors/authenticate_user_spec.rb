require 'rails_helper'

RSpec.describe AuthenticateUser, type: :interactor do
  describe '.call' do
    subject(:result) { AuthenticateUser.call(email: email, password: password) }

    let(:user) { create(:user, :with_password) }
    let(:email) { user.email }
    let(:password) { attributes_for(:password)[:password] }

    context 'with a valid email and password' do
      it { is_expected.to be_a_success }
    end

    context 'with a bad email address' do
      let(:email) { 'bad@example.com' }

      it { is_expected.to be_a_failure }
    end

    context 'with a bad email password' do
      let(:password) { 'bad' }

      it { is_expected.to be_a_failure }
    end
  end
end
