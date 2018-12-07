FactoryBot.define do
  factory :session do
    activity
    starts_at { activity.festival.start_date.midnight + 14.hours }
    ends_at { starts_at + 3.hours }
  end
end
