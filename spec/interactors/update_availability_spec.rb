require 'rails_helper'
require 'support/example_groups/registration_context'

RSpec.describe UpdateAvailability, type: :interactor do
  include_context 'registration'

  let(:registration) do
    create(:registration, festival: festival, code_of_conduct_accepted: true)
  end

  let(:attributes) do
    {
      availability: [
        { session_id: shows[0].to_param, role: 'player' },
        { session_id: shows[0].to_param, role: 'director' },
        { session_id: shows[1].to_param, role: 'player' },
        { session_id: shows[1].to_param, role: 'director' },
      ],
    }
  end

  describe '.call' do
    context 'records their initial availability' do
      it { is_expected.to be_success }

      it 'creates availability records' do
        expect { result }.to change(Availability, :count).by(4)
      end
    end

    context 'updates their availability' do
      before do
        registration.availability.create!(session: shows[2], role: 'player')
        registration.availability.create!(session: shows[1], role: 'mc')
      end

      it { is_expected.to be_success }

      it 'updates availability records' do
        expect { result }.to change(Availability, :count).by(2)
      end

      context 'with bad data' do
        let(:attributes) do
          {
            availability: [
              { session_id: sessions[0].to_param, role: 'player' },
              { session_id: sessions[0].to_param, role: 'player' },
            ],
          }
        end

        it { is_expected.to be_failure }

        it 'doesn’t change the database' do
          expect { result }.not_to change(Availability, :count)
        end

        it 'adds an error' do
          expect(result.errors).to include(:availability)
        end
      end
    end
  end
end
