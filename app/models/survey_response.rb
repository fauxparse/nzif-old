class SurveyResponse < ApplicationRecord
  belongs_to :registration
  belongs_to :session

  validates :expectations, :difficulty,
    numericality: { min: 1, max: 5, allow_blank: true }
end
