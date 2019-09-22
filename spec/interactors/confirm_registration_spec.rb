require 'rails_helper'
require 'support/example_groups/registration_context'
require 'timecop'

RSpec.describe ConfirmRegistration, type: :interactor do
  include_context 'registration'

  let(:attributes) do
    {
      state: 'complete',
    }
  end

  let(:registration) do
    create(:registration, festival: festival, code_of_conduct_accepted: true)
  end

  describe '.call' do
    let(:email) { double('email', deliver_later: true) }

    before do
      allow(UserMailer).to receive(:registration_confirmation).and_return(email)
      allow(UserMailer).to receive(:ticket_code).and_return(email)
    end

    it { is_expected.to be_success }

    it 'completes the registration' do
      result
      expect(registration.reload).to be_complete
    end

    it 'sends a code for discount tickets' do
      expect(UserMailer).to receive(:ticket_code)
      result
    end

    context 'during earlybird registration' do
      around do |example|
        festival.update!(
          registrations_open_at: festival.start_date.midnight - 1.month,
          earlybird_cutoff: festival.start_date.midnight - 1.week
        )
        Timecop.freeze(festival.earlybird_cutoff - 1.day) do
          example.run
        end
      end

      it 'sends a confirmation email' do
        expect(UserMailer).to receive(:registration_confirmation).and_call_original
        result
      end
    end

    context 'after earlybird registration' do
      around do |example|
        festival.update!(
          registrations_open_at: festival.start_date.midnight - 1.month,
          earlybird_cutoff: festival.start_date.midnight - 1.week
        )
        Timecop.freeze(festival.earlybird_cutoff + 1.day) do
          example.run
        end
      end

      it 'sends a confirmation email' do
        expect(UserMailer).to receive(:itinerary).and_call_original
        result
      end
    end
  end
end
