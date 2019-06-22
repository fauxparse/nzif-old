FactoryBot.define do
  factory :activity do
    festival

    transient do
      presenter { nil }
      presenters { [] }
    end

    factory :workshop, class: 'Workshop' do
      name { 'A workshop' }
      description { 'We learn all the things' }
    end

    factory :show, class: 'Show' do
      name { 'A show' }
      description { 'We watch all the things' }
    end

    after(:create) do |activity, evaluator|
      [evaluator.presenter, *evaluator.presenters]
        .compact
        .each { |user| activity.presenters.create(user: user) }
    end
  end
end
