require 'rails_helper'

RSpec.describe DeleteVenue, type: :interactor do
  subject(:result) { DeleteVenue.call(venue: venue, current_user: user) }

  let!(:venue) { create(:venue) }

  context 'as an ordinary user' do
    let(:user) { create(:user) }

    it 'raises an error' do
      expect { result }.to raise_error(Interaction::AccessDenied)
    end
  end

  context 'as an admin' do
    let(:user) { create(:admin) }

    it 'deletes the venue' do
      expect { result }.to change(Venue, :count).by -1
    end
  end
end
