class UpdateWorkshopSelection < Interaction
  def call
    update_workshop_selections if attributes.include?(:workshops)
    update_waitlists if attributes.include?(:waitlists)
    if attributes.include?(:workshops) || attributes.include?(:waitlists)
      registration.save!
    end
  end

  delegate :registration, :attributes, :festival, :errors, to: :context

  private

  def update_workshop_selections
    existing = set_from(registration.placements.map(&:session_id))
    fresh = set_from(attributes.workshops)

    # TODO: confirm all movements are possible

    (existing - fresh).each do |id|
      session = festival.sessions.includes(:placements).find(id)
      RemoveFromSession.call(registration: registration, session: session)
    end

    (fresh - existing).each do |id|
      session = festival.sessions.includes(:placements).find(id)
      ConfirmPlacement.call(registration: registration, session: session)
    end
  end

  def update_waitlists
    existing = set_from(registration.waitlists.map(&:session_id))
    fresh = set_from(attributes.waitlists)

    (existing - fresh).each do |id|
      RemoveFromWaitlist.call(registration: registration, session: Session.find(id))
    end

    (fresh - existing - registration.placements.map(&:session_id)).each do |id|
      AddToWaitlist.call(registration: registration, session: Session.find(id))
    end
  end

  def set_from(choices)
    Set.new(choices.map { |id| decode_id(id) })
  end

  def decode_id(id)
    case id
    when Numeric then id
    when /\A\d+\z/ then id.to_i
    else Session.decode_id(id)
    end
  end
end
