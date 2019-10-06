module Types
  class SurveyResponse < Types::BaseObject
    field :id, ID, null: false
    field :user, User, null: true
    field :expectations, Integer, null: true
    field :difficulty, Integer, null: true
    field :good, String, null: true
    field :bad, String, null: true
    field :testimonial, String, null: true
    field :created_at, Types::Time, null: false
  end
end
