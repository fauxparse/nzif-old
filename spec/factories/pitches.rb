FactoryBot.define do
  factory :pitch do
    festival
    user
    info do
      {
        presenters: [user.attributes.slice(:id, :name, :email, :city, :country)],
        company: 'Test company',
        bio: 'Test bio',
        presented_before: 'Test presented before',
        availability: 'Test availability',
        code_of_conduct: true,
      }
    end
  end
end
