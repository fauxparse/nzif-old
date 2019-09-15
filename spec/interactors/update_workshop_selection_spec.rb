require 'rails_helper'
require 'support/example_groups/registration_context'

RSpec.describe UpdateWorkshopSelection, type: :interactor do
  include_context 'registration'

  let(:registration) do
    create(:registration, festival: festival, code_of_conduct_accepted: true)
  end

  describe '.call' do
    before do
      registration.placements.create!(session: sessions[0])
      registration.placements.create!(session: sessions[3])
      registration.waitlists.create!(session: sessions[1])
      sessions.each { |session| session.update!(capacity: 1) }
    end

    let(:attributes) do
      {
        workshops: [sessions[2].to_param, sessions[3].to_param],
        waitlists: [sessions[4].to_param, sessions[5].to_param],
      }
    end

    it 'updates their workshop selections' do
      result
      expect(registration.reload.placements.map(&:session))
        .to contain_exactly(sessions[2], sessions[3])
    end

    it 'updates their waitlist selections' do
      result
      expect(registration.reload.waitlists.map(&:session))
        .to contain_exactly(sessions[4], sessions[5])
    end

    it 'notifies subscribers' do
      expect(NzifSchema.subscriptions)
        .to receive(:trigger)
        .with('sessionChanged', {}, sessions[0])
      expect(NzifSchema.subscriptions)
        .to receive(:trigger)
        .with('sessionChanged', {}, sessions[2])
      result
    end
  end
end
