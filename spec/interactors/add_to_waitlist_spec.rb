require 'rails_helper'

RSpec.describe AddToWaitlist, type: :interactor do
  subject(:result) { AddToWaitlist.call(session: session, registration: registration) }

  let(:session) { create(:session) }
  let(:registration) { create(:registration, festival: festival) }
  let(:festival) { session.activity.festival }

  describe '.call' do
    it { is_expected.to be_success }

    context 'when the user is already on the waitlist' do
      before do
        registration.waitlists.create!(session: session)
      end

      it { is_expected.to be_failure }
    end
  end

  describe 'waitlist' do
    subject(:waitlist) { result.waitlist }

    its(:position) { is_expected.to eq 1 }
  end
end
