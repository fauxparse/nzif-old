class Registration < ApplicationRecord
  belongs_to :festival
  belongs_to :user

  # Skip validation when saving these (very simple) records so that bulk updates work
  # Feels risky but there's a unique index on the table so it should be fine?
  has_many :preferences, dependent: :destroy, autosave: true, validate: false

  enum state: {
    pending: 'pending',
    complete: 'complete',
  }

  validates :festival_id, uniqueness: { scope: :user_id }, on: :update
  validates :code_of_conduct, acceptance: true, if: :requires_acceptance?

  def code_of_conduct_accepted?
    code_of_conduct_accepted_at.present?
  end

  def code_of_conduct_accepted=(value)
    self.code_of_conduct_accepted_at = value.present? ? Time.zone.now : nil
  end

  # TODO: These are the 2019 prices, future years will need an admin UI
  PRICES = [
    0,
    5500,
    10500,
    15000,
    19500,
    23500,
    27000,
    30000,
    32500,
    35000,
    37000,
    39000,
    40000,
  ].freeze

  def prices
    PRICES
  end

  alias code_of_conduct code_of_conduct_accepted?

  private

  def requires_acceptance?
    code_of_conduct_accepted_at_changed? || complete?
  end
end
