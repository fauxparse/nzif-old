FactoryBot.define do
  factory :password, class: 'Identity::Password' do
    user
    type 'Identity::Password'
    password 'P4$$w0rd'
  end
end
