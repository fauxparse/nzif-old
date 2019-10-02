module Messageable
  extend ActiveSupport::Concern

  class NoRecipientsException < StandardError; end

  included do
    has_many :messages, -> { oldest_first }, as: :messageable
  end

  def recipients
    raise NoRecipientsException,
      "please make #{self.class.name}#recipients return an array of Users"
  end
end
