FactoryBot.define do
  factory :user do
    transient { sequence(:number) }
    name { "User #{number}" }
    email { "user#{number}@example.com" }

    trait :with_password do
      after(:build) do |user|
        user.identities.build(attributes_for(:password))
      end
    end
  end
end
