class Identity
  class Password < Identity
    has_secure_password

    def authenticate(password)
      authenticate_password(password) && user
    end
  end
end
