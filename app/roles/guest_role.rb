class GuestRole < AccessGranted::Role
  def configure
    can [:update, :destroy], User do |other, user|
      other.id == user&.id
    end

    can [:update, :destroy], Pitch do |pitch, user|
      !pitch.persisted? || pitch.belongs_to?(user)
    end
  end
end
