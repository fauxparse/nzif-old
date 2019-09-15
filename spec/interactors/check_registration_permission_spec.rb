require 'rails_helper'
require 'support/example_groups/registration_context'

RSpec.describe CheckRegistrationPermission, type: :interactor do
  include_context 'registration'

  let(:context) do
    {
      festival: festival,
      current_user: user,
      attributes: attributes,
      registration: registration,
    }
  end

  let(:attributes) { {} }

  let(:registration) { create(:registration, festival: festival) }

  describe '.call' do
    context 'when updating the user’s own registration' do
      let(:user) { registration.user }

      it { is_expected.to be_success }
    end

    context 'when the user is an admin' do
      let(:user) { create(:admin) }

      it { is_expected.to be_success }
    end

    context 'when attempting to update someone else’s registration' do
      let(:user) { create(:user) }

      it 'raises an exception' do
        expect { result }.to raise_error(Interaction::AccessDenied)
      end
    end

    context 'as an anonymous user' do
      let(:user) { nil }

      it 'raises an exception' do
        expect { result }.to raise_error(Interaction::AccessDenied)
      end
    end
  end
end
