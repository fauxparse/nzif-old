class WorkshopPreferencesReport < Report::Base
  field(:name) { |row| row.registration.user.name }
  field(:workshop) { |row| row.session.activity.name }
  field(:position) { |row| row.position }

  def scope
    Preference
      .includes(session: :activity, registration: :user)
      .where(activities: { festival_id: festival.id }, registrations: { state: :complete })
      .order('activities.name ASC, preferences.position ASC')
  end
end
