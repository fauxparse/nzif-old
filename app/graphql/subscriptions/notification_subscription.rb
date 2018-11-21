module Types
  class SubscriptionType
    field :notification, Types::NotificationType,
      null: true,
      description: 'A notification was received from the server'

    def notification
      # this will be called on the first request
    end
  end
end
