FactoryBot.define do
  factory :payment do
    type { 'InternetBankingPayment' }
    registration
    amount_cents { 100_00 }
  end
end
