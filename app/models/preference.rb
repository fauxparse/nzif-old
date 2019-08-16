class Preference < ApplicationRecord
  belongs_to :registration
  belongs_to :session

  acts_as_list scope: %i[registration_id starts_at]

  before_save :set_starts_at

  validates :session_id, uniqueness: { scope: :registration_id }

  scope :confirmed, -> { joins(:registration).where(registration: { state: 'complete' }) }

  private

  def set_starts_at
    self.starts_at ||= session.starts_at
  end
end
