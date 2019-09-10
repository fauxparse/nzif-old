class Waitlist < ApplicationRecord
  belongs_to :session
  belongs_to :registration

  acts_as_list scope: :session_id

  validates :session_id, :registration_id, presence: true
  validates :session_id, uniqueness: { scope: :registration_id }
  validates :registration_id, uniqueness: { scope: :session_id }
end
