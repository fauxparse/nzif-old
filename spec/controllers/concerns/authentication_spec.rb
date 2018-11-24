require 'rails_helper'

RSpec.describe Authentication do
  class AuthenticationTest < ApplicationController
    include Authentication
  end

  let(:controller) { AuthenticationTest.new }
  let(:cookies) { double(:cookies) }
  let(:cookie) { '[encrypted]' }
  let(:token_encoder) { instance_double('Authentication::TokenEncoder') }

  before do
    allow(controller).to receive(:cookies).and_return(cookies)
    allow(Authentication::TokenEncoder).to receive(:new).and_return(token_encoder)
  end

  describe '#current_user' do
    subject(:current_user) { controller.current_user }

    context 'when a user is logged in' do
      let(:user) { create(:user) }

      it 'authenticates as the user' do
        expect(cookies).to receive(:[]).with(Authentication::COOKIE) { cookie }
        expect(token_encoder).to receive(:decode).with(cookie) { user.id }
        expect(current_user).to eq user
      end
    end

    context 'when nobody is logged in' do
      it 'does not authenticate' do
        expect(cookies).to receive(:[]).with(Authentication::COOKIE).and_return(nil)
        expect(token_encoder).to receive(:decode).with(nil).and_return(nil)
        expect(current_user).to be_nil
      end
    end

    context 'with a stale cookie' do
      it 'is nil' do
        expect(cookies).to receive(:[]).with(Authentication::COOKIE) { cookie }
        expect(token_encoder).to receive(:decode).with(cookie).and_return(1)
        expect(current_user).to be_nil
      end
    end
  end

  describe '#current_user=' do
    context 'with a user' do
      let(:user) { create(:user) }

      it 'sets the cookie variable' do
        expect(token_encoder).to receive(:encode).with(user.id) { cookie }
        expect(cookies).to receive(:[]=).with(Authentication::COOKIE, cookie)

        controller.current_user = user
      end
    end

    context 'with no user' do
      it 'sets the cookie variable' do
        expect(token_encoder).to receive(:encode).with(nil).and_return(nil)
        expect(cookies).to receive(:[]=).with(Authentication::COOKIE, nil)

        controller.current_user = nil
      end
    end
  end
end
