FactoryBot.define do
  factory :slot do
    festival
    starts_at { festival.start_date.midnight + 10.hours }
    ends_at { starts_at + 3.hours }
    activity_type { 'standalone_workshop' }
  end
end
