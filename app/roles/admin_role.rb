class AdminRole < AccessGranted::Role
  def applies_to?(user)
    super && user&.admin?
  end

  def configure
    can :process, Pitch
    can :manage, Object
  end
end
