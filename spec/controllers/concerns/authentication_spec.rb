require 'rails_helper'

RSpec.describe Authentication do
  class AuthenticationTest < ApplicationController
    include Authentication
  end

  let(:controller) { AuthenticationTest.new }
  let(:session) { double(:session) }

  before do
    allow(controller).to receive(:session).and_return(session)
  end

  describe '#current_user' do
    subject { controller.current_user }

    context 'when a user is logged in' do
      let(:user) { create(:user) }

      before do
        allow(session).
          to receive(:[]).
          with(Authentication::SESSION_KEY).
          and_return user.id
      end

      it { is_expected.to eq user }
    end

    context 'when nobody is logged in' do
      before do
        allow(session).
          to receive(:[]).
          with(Authentication::SESSION_KEY).
          and_return nil
      end

      it { is_expected.to be_nil }
    end

    context 'with a stale session' do
      before do
        allow(session).
          to receive(:[]).
          with(Authentication::SESSION_KEY).
          and_return 1
      end

      it { is_expected.to be_nil }
    end
  end

  describe '#current_user=' do
    context 'with a user' do
      let(:user) { create(:user) }

      it 'sets the session variable' do
        expect(session).
          to receive(:[]=).
          with(Authentication::SESSION_KEY, user.id).
          and_return nil

        controller.current_user = user
      end
    end

    context 'with no user' do
      it 'sets the session variable' do
        expect(session).
          to receive(:[]=).
          with(Authentication::SESSION_KEY, nil).
          and_return nil

        controller.current_user = nil
      end
    end
  end
end
