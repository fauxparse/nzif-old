module Types
  class SubscriptionType < Types::BaseObject
    include Subscriptions::Notification
    include Subscriptions::RegistrationCount
  end
end
