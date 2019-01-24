FactoryBot.define do
  factory :presenter do
    activity { create(:workshop) }
    user
  end
end
