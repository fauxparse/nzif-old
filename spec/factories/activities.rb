FactoryBot.define do
  factory :workshop do
    festival
    name 'A workshop'
    description 'We learn all the things'
  end

  factory :show do
    festival
    name 'A show'
    description 'We watch all the things'
  end
end
