class Incident < ApplicationRecord
  include Hashid::Rails

  belongs_to :festival
  belongs_to :user, required: false

  enum state: {
    open: 'open',
    closed: 'closed',
  }

  def anonymous?
    user.blank?
  end
end
