module Types
  class SubscriptionType
    field :notification, Types::Notification, null: true do
      description 'A notification was received from the server'
      argument :user_id, ID, required: true
    end

    def notification(user_id:)
      # this will be called on the first request
    end
  end
end
