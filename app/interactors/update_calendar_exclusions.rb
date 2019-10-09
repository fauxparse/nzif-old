class UpdateCalendarExclusions < Interaction
  def call
    access_denied! unless can?(:update, registration)
    update_exclusions
  end

  delegate :registration, :excluded_ids, to: :context

  private

  def update_exclusions
    desired = Set.new(excluded_ids)
    existing = Set.new(registration.calendar_exclusions.map(&:session_id))
    registration.calendar_exclusions.each do |exclusion|
      exclusion.destroy! if desired.exclude?(exclusion.session_id)
    end
    (desired - existing).each do |id|
      registration.calendar_exclusions.create!(session_id: id)
    end
  end
end
