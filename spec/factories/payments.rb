FactoryBot.define do
  factory :payment do
    registration
    amount_cents { 100_00 }
  end
end
