class Waitlist < ApplicationRecord
  belongs_to :session
  belongs_to :registration

  acts_as_list scope: :session_id

  validates :session_id, :registration_id, presence: true
  validates :session_id, uniqueness: { scope: :registration_id }
  validates :registration_id, uniqueness: { scope: :session_id }
  validate :not_in_session

  private

  def not_in_session
    errors.add(:session_id, :already_selected) if already_in_session?
  end

  def already_in_session?
    registration.placements.where(session_id: session_id).exists?
  end
end
