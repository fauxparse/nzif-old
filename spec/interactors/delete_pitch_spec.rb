require 'rails_helper'

RSpec.describe DeletePitch, type: :interactor do
  subject(:result) { DeletePitch.call(pitch: pitch, current_user: user) }

  let(:pitch) { create(:pitch) }

  context 'as an admin' do
    let(:user) { create(:admin) }

    it { is_expected.to be_success }
  end

  context 'as the pitch’s owner' do
    let(:user) { pitch.user }

    it { is_expected.to be_success }
  end

  context 'as another user' do
    let(:user) { create(:user) }

    it 'raises an error' do
      expect { result }.to raise_error(Interaction::AccessDenied)
    end
  end
end
