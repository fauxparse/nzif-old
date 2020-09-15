FactoryBot.define do
  factory :festival do
    start_date { '2018-10-20' }
    end_date { '2018-10-27' }

    trait :with_prices do
      after(:build) do |festival|
        workshop_prices_2019 = [
          5500,
          10500,
          15000,
          19500,
          23500,
          27000,
          30000,
          32500,
          35000,
          37000,
          39000,
          40000,
        ]

        workshop_prices_2019.each.with_index(1) do |cents, quantity|
          festival.prices.build(
            quantity: quantity,
            amount_cents: cents,
            activity_type: 'Workshop'
          )
        end
      end
    end
  end
end
