class Identity
  class Oauth < Identity
    validates :uid, presence: true, uniqueness: { scope: :type }
    validates :type, uniqueness: { scope: :user_id }
  end
end
