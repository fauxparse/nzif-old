class Availability < ApplicationRecord
  belongs_to :session
  belongs_to :registration

  validates :session_id, uniqueness: { scope: %i[registration_id role] }

  enum role: {
    player: 'player',
    mc: 'mc',
    director: 'director',
  }
end
