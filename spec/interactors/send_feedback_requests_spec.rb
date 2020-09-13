require 'rails_helper'
require 'timecop'

RSpec.describe SendFeedbackRequests, type: :interactor do
  subject(:result) { SendFeedbackRequests.call }

  let(:festival) { create(:festival) }
  let(:workshops) { create_list(:workshop, 6, festival: festival) }
  let(:sessions) do
    workshops.map.with_index do |workshop, i|
      start = (festival.start_date + (i % 3).days).midnight.change(hour: 10)
      create(:session, activity: workshop, starts_at: start, ends_at: start + 3.hours)
    end
  end
  let(:registration) do
    create(:registration, festival: festival).tap do |registration|
      sessions[0...3].each do |session|
        registration.placements.create!(session: session)
      end
    end
  end

  around do |example|
    Timecop.freeze(sessions.second.ends_at + 10.minutes) do
      [sessions[0], sessions[3]].each do |session|
        session.update!(feedback_requested_at: 1.day.ago)
      end

      example.run
    end
  end

  describe '.call' do
    before do
      stub_request(:get, "https://fonts.googleapis.com/css?family=Work%20Sans:400,600")
        .with(
          headers: {
            'Accept' => '*/*',
            'Accept-Encoding' => 'gzip;q=1.0,deflate;q=0.6,identity;q=0.3',
            'Host' => 'fonts.googleapis.com',
            'User-Agent' => 'Ruby',
          }
        )
        .to_return(status: 200, body: '', headers: {})
    end

    it { is_expected.to be_success }

    it 'sends an email for only the session that has just finished' do
      expect(UserMailer)
        .to receive(:feedback_request)
        .once
        .with(sessions.second, registration.user)
        .and_call_original
      result
    end

    it 'updates feedback_requested_at' do
      expect { result }
        .to change { sessions.second.reload.feedback_requested_at }
        .from(nil)
        .to(Time.now)
        .and change { sessions.fifth.reload.feedback_requested_at }
        .from(nil)
        .to(Time.now)
    end
  end
end
