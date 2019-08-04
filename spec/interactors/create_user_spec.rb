require 'rails_helper'

RSpec.describe CreateUser, type: :interactor do
  describe '.call' do
    subject(:result) do
      CreateUser.call(
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      )
    end

    let(:name) { 'Test user' }
    let(:email) { 'test@example.com' }
    let(:password) { 'P4$$w0rd' }
    let(:password_confirmation) { password }

    it { is_expected.to be_a_success }

    context 'with a blank name' do
      let(:name) { '' }

      it 'raises an error' do
        expect { result }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context 'with a bad password confirmation' do
      let(:password_confirmation) { 'invalid' }

      it 'raises an error' do
        expect { result }.to raise_error(ActiveRecord::RecordInvalid)
      end
    end

    context 'with an existing email' do
      let!(:existing_user) { create(:user, email: email) }

      context 'and password' do
        before do
          create(:password, user: existing_user)
        end

        it 'raises an error' do
          expect { result }.to raise_error(ActiveRecord::RecordInvalid)
        end
      end

      context 'without a password' do
        it 'adds the password to the existing user' do
          expect { result }.to change { existing_user.identities.count }.by(1)
        end
      end
    end
  end
end
