class GuestRole < AccessGranted::Role
  def configure
    can [:update, :destroy], User do |other, user|
      other.id == user&.id
    end

    can [:read, :update, :destroy], Pitch do |pitch, user|
      !pitch.persisted? || pitch.belongs_to?(user)
    end

    can [:read, :update], Registration do |registration, user|
      registration.user == user
    end

    can [:cancel], Payment do |payment, user|
      user == payment.registration.user
    end
  end
end
