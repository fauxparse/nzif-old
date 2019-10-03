FactoryBot.define do
  factory :incident do
    festival
    user
    body { 'Something bad happened' }
  end
end
