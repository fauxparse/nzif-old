class GuestRole < AccessGranted::Role
  def configure
    can :manage, User do |other, user|
      other.id == user.id
    end

    can :manage, Pitch do |pitch, user|
      !pitch.persisted? || pitch.belongs_to?(user)
    end
  end
end
