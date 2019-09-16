class Payment < ApplicationRecord
  monetize :amount_cents

  belongs_to :registration

  enum state: {
    pending: 'pending',
    approved: 'approved',
    declined: 'declined',
    cancelled: 'cancelled',
  }
end
