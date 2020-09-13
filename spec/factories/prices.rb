FactoryBot.define do
  factory :price do
    festival
    activity_type { 'Workshop' }
    quantity { 1 }
    amount_cents { 50_00 }
  end
end
