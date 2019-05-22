FactoryBot.define do
  factory :venue do
    name { 'BATS' }
    address { '1 Kent Tce' }
    latitude { '-41.2921901197085'.to_d }
    longitude { '174.7858539802915'.to_d }
  end
end
