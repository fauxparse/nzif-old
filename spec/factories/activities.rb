FactoryBot.define do
  factory :activity do
    festival

    transient do
      presenter { nil }
      presenters { [] }
    end

    factory :workshop, class: 'Workshop' do
      transient { sequence(:number) }
      name { "Workshop #{number}" }
      description { 'We learn all the things' }
    end

    factory :show, class: 'Show' do
      transient { sequence(:number) }
      name { "Show #{number}" }
      description { 'We watch all the things' }
    end

    after(:create) do |activity, evaluator|
      [evaluator.presenter, *evaluator.presenters]
        .compact
        .each { |user| activity.presenters.create(user: user) }
    end
  end
end
