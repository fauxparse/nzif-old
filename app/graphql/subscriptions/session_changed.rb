module Subscriptions
  module SessionChanged
    extend ActiveSupport::Concern

    included do
      field :session_changed, Types::Session, null: true do
        description 'Session details were changed'
      end

      def session_changed
        nil
      end
    end
  end
end
