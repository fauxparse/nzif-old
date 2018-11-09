class Identity
  class Password < Identity
    has_secure_password

    def authenticate(password)
      super && user
    end
  end
end
