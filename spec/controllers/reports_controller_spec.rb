require 'rails_helper'

RSpec.describe ReportsController, type: :request do
  let(:festival) { create(:festival) }
  let(:report) { 'money_owed' }
  let(:format) { :csv }
  let(:workshop) { create(:workshop, festival: festival) }
  let(:session) { create(:session, activity: workshop) }
  let(:registration) { create(:registration, :complete, festival: festival) }
  let!(:placement) { create(:placement, registration: registration, session: session) }

  describe '#show' do
    before do
      allow_any_instance_of(ApplicationController)
        .to receive(:current_user)
        .and_return(user)
      get report_path(festival.year, report, format: format)
    end

    context 'when not logged in' do
      let(:user) { nil }

      it 'denies access' do
        expect(response).to be_forbidden
      end
    end

    context 'when logged in' do
      context 'as a normal user' do
        let(:user) { create(:user) }

        it 'denies access' do
          expect(response).to be_forbidden
        end
      end

      context 'as an admin user' do
        let(:user) { create(:admin) }

        it 'succeeds' do
          expect(response).to be_successful
        end

        it 'has the correct content type' do
          expect(response.content_type).to eq 'text/csv'
        end

        context 'for a non-existent report' do
          let(:report) { 'fake' }

          it 'returns 404' do
            expect(response.message).to eq 'Not Found'
          end
        end

        context 'for a bad format' do
          let(:format) { 'txt' }

          it 'fails' do
            expect(response.message).to eq 'Not Acceptable'
          end
        end

        describe '#body' do
          subject(:body) { CSV.parse(response.body) }

          it { is_expected.to have_exactly(2).items }
        end
      end
    end
  end
end
