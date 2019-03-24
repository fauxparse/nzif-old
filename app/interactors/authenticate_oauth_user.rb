class AuthenticateOauthUser < Interaction
  def call
    user = identity.user
    attach_image_to(user)
    context.user = user
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

  def attach_image_to(user)
    if image.present? && !user.image.attached?
      AttachImageFromUrl.call(subject: user, url: image)
    end
  end
end
