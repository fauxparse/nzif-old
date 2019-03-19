require 'rails_helper'

RSpec.describe AuthenticateOauthUser, type: :interactor do
  describe '.call' do
    subject(:result) { AuthenticateOauthUser.call(auth: auth) }

    let(:name) { 'Test User' }
    let(:email) { 'test@example.com' }
    let(:uid) { '1234567890' }
    let(:provider) { 'facebook' }
    let(:auth) do
      {
        'provider': provider,
        'uid': uid,
        'info': {
          'email': email,
          'name': name,
        },
      }
    end

    context 'for a new user' do
      it 'is successful' do
        expect(result).to be_success
      end

      it 'creates a user' do
        expect { result }.to change(User, :count).by 1
      end

      it 'creates an identity' do
        expect { result }.to change(Identity::Facebook, :count).by 1
      end

      it 'links the identity to the user' do
        expect(result.user.identities.first.uid).to eq uid
      end
    end

    context 'for an existing user' do
      let!(:user) { create(:user, name: name, email: email) }

      it 'is successful' do
        expect(result).to be_success
      end

      it 'returns the user' do
        expect(result.user).to eq user
      end

      it 'does not create a new user' do
        expect { result }.not_to change(User, :count)
      end

      it 'creates an identity' do
        expect { result }.to change(Identity::Facebook, :count).by 1
      end

      it 'links the identity to the user' do
        expect(result.user.identities.first.uid).to eq uid
      end

      context 'with an existing identity' do
        before do
          Identity::Facebook.create!(user: user, uid: uid)
        end

        it 'is successful' do
          expect(result).to be_success
        end

        it 'returns the user' do
          expect(result.user).to eq user
        end

        it 'does not create a new user' do
          expect { result }.not_to change(User, :count)
        end

        it 'does not creates a new identity' do
          expect { result }.not_to change(Identity::Facebook, :count)
        end
      end
    end
  end
end
