class PitchContactsReport < Report::Base
  TYPES = {
    workshop: 'Workshop',
    directed: 'New works',
    season: 'Mini season',
    young: 'Improv for young audiences',
  }.with_indifferent_access.freeze

  field(:name) { |row| row.user.name }
  field(:email) { |row| row.user.email }
  field(:title) { |row| row.name }
  field(:type) { |row| TYPES[row.info.activity_type] }
  field(:pile) { |row| row.info.pile }
  field(:gender) { |row| row.info.gender }
  field(:origin) { |row| row.info.origin }

  def scope
    festival.pitches.submitted.includes(:user)
  end
end
