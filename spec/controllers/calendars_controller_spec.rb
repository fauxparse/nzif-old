require 'rails_helper'

RSpec.describe CalendarsController, type: :request do
  subject { response }

  let(:registration) { create(:registration) }
  let(:festival) { registration.festival }
  let(:workshops) { create_list(:workshop, 2, festival: festival) }
  let(:show) { create(:show, festival: festival) }
  let(:sessions) do
    workshops.map { |workshop| create(:session, activity: workshop) } +
    [create(:session, activity: show)]
  end

  describe 'GET /calendars/:id.ics' do
    before do
      registration.placements.create!(session: sessions.first)
      registration.calendar_exclusions.create!(session: sessions.third)
      get calendar_path(registration, format: :ics)
    end

    it { is_expected.to be_successful }

    its(:content_type) { is_expected.to eq 'text/calendar; charset=utf-8' }

    it 'includes workshops the user is signed up for' do
      expect(response.body).to include workshops.first.name
    end

    it 'does not include workshops the user is not signed up for' do
      expect(response.body).not_to include workshops.second.name
    end

    it 'does not include sessions the user has hidden' do
      expect(response.body).not_to include show.name
    end
  end
end
