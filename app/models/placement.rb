class Placement < ApplicationRecord
  belongs_to :registration, counter_cache: true
  belongs_to :session, counter_cache: true

  validates :registration_id, :session_id, presence: true
  validates :registration_id, uniqueness: { scope: :session_id }
  validates :session_id, uniqueness: { scope: :registration_id }
  validate :session_time_is_unique

  def clashes_with?(other)
    id != other.id &&
      !other.marked_for_destruction? &&
      !other.destroyed? &&
      session.starts_at == other.session.starts_at
  end

  private

  def session_time_is_unique
    clashing_placements = registration.placements.select { |other| clashes_with?(other) }
    errors.add(:session_id, :clashes) unless clashing_placements.empty?
  end
end
