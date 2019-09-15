class UpdateRegistrationPreferences < Interaction
  def call
    if festival.earlybird? && attributes.include?(:preferences)
      update_preferences
    end

  rescue ActiveRecord::RecordNotUnique
    errors.add(:preferences, 'must be unique by registration and session')
    context.fail!
  end

  delegate :registration, :attributes, :festival, :errors, to: :context

  private

  def update_preferences
    Preference.acts_as_list_no_update do
      if existing != fresh
        registration.preferences.each do |pref|
          pref.mark_for_destruction if fresh.exclude? [pref.session_id, pref.position]
        end

        (fresh - existing).each do |session_id, position|
          registration.preferences.build(session_id: session_id, position: position)
        end

        registration.save!
      end
    end
  end

  def existing
    @existing ||= set_from(registration.preferences)
  end

  def fresh
    @fresh ||= set_from(attributes.preferences)
  end

  def set_from(preferences)
    Set.new(preferences.map { |pref| [decode_id(pref.session_id), pref.position] })
  end

  def decode_id(id)
    case id
    when Numeric then id
    when /\A\d+\z/ then id.to_i
    else Session.decode_id(id)
    end
  end
end
