require 'rails_helper'

RSpec.describe AuthenticateOauthUser, type: :interactor do
  describe '.call' do
    subject(:result) { AuthenticateOauthUser.call(auth: auth) }

    let(:name) { 'Test User' }
    let(:email) { 'test@example.com' }
    let(:uid) { '1234567890' }
    let(:image_url) { 'http://example.com/avatar.jpg' }
    let(:image_path) { File.expand_path('../support/files/avatar.jpg', __dir__) }
    let(:provider) { 'facebook' }
    let(:auth) do
      {
        'provider': provider,
        'uid': uid,
        'info': {
          'email': email,
          'name': name,
          'image': image_url,
        },
      }
    end

    before do
      stub_request(:get, image_url).to_return(status: 200, body: File.new(image_path))
    end

    context 'for a new user' do
      it 'is successful' do
        expect(result).to be_success
      end

      it 'creates a user' do
        expect { result }.to change(User, :count).by 1
      end

      it 'attaches the user’s image' do
        expect(result.user.image).to be_attached
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
