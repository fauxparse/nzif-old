module Types
  class MutationType
    field :sign_up, UserType, null: true, description: 'Sign up as a new user' do
      argument :name, String, required: true
      argument :email, String, required: true
      argument :password, String, required: true
      argument :password_confirmation, String, required: true
    end

    def sign_up(name:, email:, password:, password_confirmation:)
      result = CreateUser.call(
        name: name,
        email: email,
        password: password,
        password_confirmation: password_confirmation
      )

      if result.success?
        context[:environment].current_user = result.user
      end
    end
  end
end
