module Mutations
  class LogIn < BaseMutation
    description 'Log in with a password'
    payload_type Types::UserType
    null true

    argument :email, String, required: true
    argument :password, String, required: true

    def resolve(email:, password:)
      result = AuthenticateUser.call(email: email, password: password)

      if result.success?
        context[:environment].current_user = result.user
      else
        return GraphQL::ExecutionError.new('Invalid email or password.')
      end
    end
  end
end
