class Slot < ApplicationRecord
  belongs_to :festival

  validates :starts_at, uniqueness: { scope: %i(festival_id activity_type) }
  validates :starts_at, :ends_at,
    presence: true,
    date: {
      on_or_after: ->(slot) { slot.festival.start_date },
      on_or_before: ->(slot) { slot.festival.end_date },
    }
  validates :ends_at, time: { after: :starts_at }
end
