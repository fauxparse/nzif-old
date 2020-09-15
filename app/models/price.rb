class Price < ApplicationRecord
  include Hashid::Rails

  monetize :amount_cents

  belongs_to :festival

  validates :amount_cents, :activity_type, :quantity, presence: true
  validates :amount_cents, numericality: { greater_than_or_equal_to: 0 }
  validates :quantity,
    numericality: { greater_than: 0 },
    uniqueness: { scope: %i(festival_id activity_type) }

  scope :by_quantity, -> { order(quantity: :asc) }
end
