class Registration < ApplicationRecord
  belongs_to :festival
  belongs_to :user
  has_many :preferences, dependent: :destroy, autosave: true

  enum state: {
    pending: 'pending',
    complete: 'complete',
  }

  validates :festival_id, uniqueness: { scope: :user_id }
  validates :code_of_conduct, acceptance: true, if: :complete?

  def code_of_conduct_accepted?
    code_of_conduct_accepted_at.present?
  end

  alias code_of_conduct code_of_conduct_accepted?
end
