class AuthenticateOauthUser < Interaction
  def call
    context.user = identity.user
  end

  private

  delegate :provider, :uid, :info, to: :auth
  delegate :name, :email, :image, to: :info

  def auth
    @auth ||= Hashie::Mash.new(context.auth)
  end

  def identity_class
    Identity.const_get(provider.to_s.camelize)
  end

  def identity
    @identity ||= Identity.create_or_find_by!(type: identity_class.name, uid: uid) do |identity|
      create_or_find_user.identities << identity
    end
  end

  def create_or_find_user
    User.create!(name: name, email: email)
  rescue ActiveRecord::RecordInvalid
    User.find_by_email(email)
  end
end
