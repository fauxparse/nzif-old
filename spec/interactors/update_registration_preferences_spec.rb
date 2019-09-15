require 'rails_helper'
require 'support/example_groups/registration_context'

RSpec.describe UpdateRegistrationPreferences, type: :interactor do
  include_context 'registration'

  let(:registration) do
    create(:registration, festival: festival, code_of_conduct_accepted: true)
  end

  let(:attributes) do
    {
      preferences: [
        { session_id: sessions[1].to_param, position: 1 },
        { session_id: sessions[0].to_param, position: 2 },
        { session_id: sessions[3].to_param, position: 1 },
      ],
    }
  end

  describe '.call' do
    context 'records their initial preferences' do
      before do
        allow(festival).to receive(:earlybird?).and_return(true)
      end

      it { is_expected.to be_success }

      it 'creates preference records' do
        expect { result }.to change(Preference, :count).by(3)
      end
    end

    context 'updates their preferences' do
      before do
        allow(festival).to receive(:earlybird?).and_return(true)
        registration.preferences.create!(session: sessions[2])
        registration.preferences.create!(session: sessions[1])
      end

      it { is_expected.to be_success }

      it 'updates preference records' do
        expect { result }.to change(Preference, :count).by(1)
      end

      context 'with bad data' do
        let(:attributes) do
          {
            preferences: [
              { session_id: sessions[0].to_param, position: 1 },
              { session_id: sessions[0].to_param, position: 2 },
            ],
          }
        end

        it { is_expected.to be_failure }

        it 'doesn’t change the database' do
          expect { result }.not_to change(Preference, :count)
        end

        it 'adds an error' do
          expect(result.errors).to include(:preferences)
        end
      end
    end
  end
end
