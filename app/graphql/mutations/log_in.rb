module Types
  class MutationType
    field :log_in, UserType, null: false, description: 'Log in with a password' do
      argument :email, String, required: true
      argument :password, String, required: true
    end

    def log_in(email:, password:)
      result = AuthenticateUser.call(email: email, password: password)
      if result.success?
        result.user
      else
        return GraphQL::ExecutionError.new('Invalid email or password')
      end
    end
  end
end
