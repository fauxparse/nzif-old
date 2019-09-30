FactoryBot.define do
  factory :registration do
    festival
    user

    trait :complete do
      code_of_conduct_accepted { true }
      state { 'complete' }
    end
  end
end
