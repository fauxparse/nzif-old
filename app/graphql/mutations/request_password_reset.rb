module Mutations
  class RequestPasswordReset < BaseMutation
    description 'Requests a reset code for a user’s password'
    payload_type Boolean
    null false

    argument :email, String, required: true

    def resolve(email:)
      user = User.find_by(email: email)
      user.present? && GeneratePasswordReset.call(user: user).success?
    end
  end
end
