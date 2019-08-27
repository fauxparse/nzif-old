FactoryBot.define do
  factory :password, class: 'Identity::Password' do
    user
    type { 'Identity::Password' }
    password { 'P4$$w0rd' }
  end

  factory :facebook, class: 'Identity::Facebook' do
    user
    type { 'Identity::Facebook' }
    uid { SecureRandom.hex(16) }
  end
end
