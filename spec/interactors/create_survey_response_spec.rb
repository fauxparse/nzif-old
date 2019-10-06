require 'rails_helper'

RSpec.describe CreateSurveyResponse, type: :interactor do
  subject(:result) { CreateSurveyResponse.call(**parameters) }

  let(:parameters) do
    {
      attributes: attributes_for(:survey_response).except(:session, :registration),
      current_user: user,
      session: session,
    }
  end

  let(:user) { create(:user) }
  let(:session) { create(:session) }
  let(:festival) { session.festival }

  describe '.call' do
    context 'when the user is not registered' do
      it 'raises an error' do
        expect { result }.to raise_error(Interaction::AccessDenied)
      end
    end

    context 'when the user is registered' do
      let!(:registration) { create(:registration, user: user, festival: festival) }

      context 'but not enrolled' do
        it 'raises an error' do
          expect { result }.to raise_error(Interaction::AccessDenied)
        end
      end

      context 'and enrolled' do
        let!(:placement) do
          create(:placement, session: session, registration: registration)
        end

        it { is_expected.to be_success }

        describe '#response' do
          subject(:response) { result.response }

          it { is_expected.to be_persisted }

          its(:good) { is_expected.to be_present }
          its(:bad) { is_expected.to be_present }
          its(:testimonial) { is_expected.to be_present }
        end
      end
    end
  end
end
