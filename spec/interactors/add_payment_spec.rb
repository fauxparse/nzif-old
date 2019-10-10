require 'rails_helper'

RSpec.describe AddPayment, type: :interactor do
  subject(:result) { AddPayment.call(attributes: attributes, current_user: user) }

  let(:registration) { create(:registration) }

  context 'with valid attributes' do
    let(:attributes) do
      {
        type: 'InternetBankingPayment',
        amount: 10000,
        registration: registration,
      }
    end

    context 'and a valid user' do
      let(:user) { create(:admin) }

      it { is_expected.to be_success }
    end

    context 'but an ordinary user' do
      let(:user) { registration.user }

      it 'raises an exception' do
        expect { result }.to raise_error(Interaction::AccessDenied)
      end
    end
  end
end
