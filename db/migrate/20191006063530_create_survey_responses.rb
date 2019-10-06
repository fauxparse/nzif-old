class CreateSurveyResponses < ActiveRecord::Migration[6.0]
  def change
    create_table :survey_responses do |t|
      t.belongs_to :registration, null: false, foreign_key: true
      t.belongs_to :session, null: false, foreign_key: true
      t.integer :expectations
      t.integer :difficulty
      t.text :good
      t.text :bad
      t.text :testimonial

      t.timestamps
    end
  end
end
