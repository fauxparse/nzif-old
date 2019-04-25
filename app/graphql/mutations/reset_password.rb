module Mutations
  class ResetPassword < BaseMutation
    description 'Resets a user’s password'
    payload_type Types::User
    null false

    argument :token, String, required: true
    argument :password, String, required: true
    argument :password_confirmation, String, required: true

    def resolve(token:, password:, password_confirmation:)
      result = ::ResetPassword.call(
        token: token,
        password: password,
        password_confirmation: password_confirmation
      )

      if result.success?
        context[:environment].current_user = result.user
      else
        return GraphQL::ExecutionError.new('Couldn’t log you in. Make sure the passwords match!')
      end
    end
  end
end
