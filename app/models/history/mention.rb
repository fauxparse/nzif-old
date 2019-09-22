class History::Mention < ApplicationRecord
  belongs_to :item
  belongs_to :subject, polymorphic: true
end
