require 'rails_helper'

RSpec.describe PaymentsController, type: :request do
  subject { response }

  describe 'GET /payments/:id/cancel' do
    let(:payment) { create(:payment) }

    let(:festival) { payment.registration.festival }

    let(:user) { payment.registration.user }

    before do
      allow_any_instance_of(ApplicationController)
        .to receive(:current_user)
        .and_return(user)

      get cancel_payment_path(payment.id)
    end

    it { is_expected.to redirect_to "/#{festival.year}/register/payment" }
  end
end
