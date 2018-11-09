class User < ApplicationRecord
  has_many :identities, dependent: :destroy, autosave: true

  def self.find_by_email(email)
    where('lower(email) = ?', email).first
  end
end
