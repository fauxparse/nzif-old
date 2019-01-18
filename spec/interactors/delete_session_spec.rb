require 'rails_helper'

RSpec.describe DeleteSession, type: :interactor do
  subject(:result) do
    DeleteSession.call(current_user: user, session: session)
  end

  let(:session) { FactoryBot.create(:session) }
  let(:user) { create(:admin) }

  describe '.call' do
    context 'with valid attributes' do
      it { is_expected.to be_a_success }
    end
  end
end
