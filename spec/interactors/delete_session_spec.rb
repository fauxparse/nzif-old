require 'rails_helper'

RSpec.describe DeleteSession, type: :interactor do
  subject(:result) do
    DeleteSession.call(session: session)
  end

  let(:session) { FactoryBot.create(:session) }

  describe '.call' do
    context 'with valid attributes' do
      it { is_expected.to be_a_success }
    end
  end
end
