module Types
  class SubscriptionType < Types::BaseObject
    include Subscriptions::Notification
    include Subscriptions::RegistrationCount
    include Subscriptions::SessionChanged
  end
end
