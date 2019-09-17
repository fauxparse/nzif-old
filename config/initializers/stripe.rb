Rails.application.config.stripe.tap do |config|
  config.signing_secrets = [ENV['STRIPE_CHECKOUT_SIGNING_SECRET']].compact
  config.auto_mount = false
  config.eager_load = %w(credit_card_payment)
end
