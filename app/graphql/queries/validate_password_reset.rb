module Queries
  module ValidatePasswordReset
    extend ActiveSupport::Concern

    included do
      field :validate_password_reset, GraphQL::Types::Boolean, null: false do
        description 'Validate a password reset token'
        argument :token, String, required: true
      end

      def validate_password_reset(token:)
        identity = Identity::Password.find_by(reset_token: token)
        identity && !identity.reset_token_expired?
      end
    end
  end
end
