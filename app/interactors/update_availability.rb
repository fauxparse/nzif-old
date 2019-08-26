class UpdateAvailability < Interaction
  def call
    update_availability if attributes.include?(:availability)

  rescue ActiveRecord::RecordNotUnique
    errors.add(:availability, 'must be unique by registration, session, and role')
    context.fail!
  end

  delegate :registration, :attributes, :errors, to: :context

  private

  def update_availability
    if existing != fresh
      registration.availability.each do |avail|
        avail.mark_for_destruction if fresh.exclude? [avail.session_id, avail.role]
      end

      (fresh - existing).each do |session_id, role|
        registration.availability.build(session_id: session_id, role: role)
      end

      registration.save!
    end
  end

  def existing
    @existing ||= set_from(registration.availability)
  end

  def fresh
    @fresh ||= set_from(attributes.availability)
  end

  def set_from(availability)
    availability.map { |avail| [decode_id(avail.session_id), avail.role] }
  end

  def decode_id(id)
    case id
    when Numeric then id
    when /\A\d+\z/ then id.to_i
    else Session.decode_id(id)
    end
  end
end
