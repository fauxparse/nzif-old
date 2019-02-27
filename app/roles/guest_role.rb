class GuestRole < AccessGranted::Role
  def configure
    can :manage, User do |other, user|
      other.id == user.id
    end
  end
end
