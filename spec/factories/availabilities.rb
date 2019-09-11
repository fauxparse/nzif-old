FactoryBot.define do
  factory :availability do
    session
    registration
    role { 'player' }
  end
end
