FactoryBot.define do
  factory :message do
    messageable { create(:session) }
    sender { create(:admin) }
    subject { 'subject' } # rubocop:disable RSpec/EmptyLineAfterSubject
    body { 'body' }
  end
end
