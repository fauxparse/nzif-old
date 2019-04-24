class Identity
  class Password < Identity
    has_secure_password

    RESET_TOKEN_TTL = 1.day

    validates :type, uniqueness: { scope: :user_id }

    def authenticate(password)
      authenticate_password(password) && user
    end

    def reset_token_expired?
      updated_at + RESET_TOKEN_TTL < Time.now
    end
  end
end
