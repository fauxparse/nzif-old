require 'rails_helper'
require 'support/example_groups/registration_context'

RSpec.describe AcceptCodeOfConduct, type: :interactor do
  include_context 'registration'

  let(:attributes) { {} }

  let(:registration) { create(:registration, festival: festival) }

  describe '.call' do
    context 'when accepting' do
      let(:attributes) { { code_of_conduct_accepted_at: Time.now.iso8601 } }

      it 'records acceptance' do
        expect { result }
          .to change { registration.reload.code_of_conduct_accepted? }
          .from(false)
          .to(true)
      end
    end
  end
end
