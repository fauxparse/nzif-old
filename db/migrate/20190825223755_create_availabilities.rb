class CreateAvailabilities < ActiveRecord::Migration[6.0]
  def change
    create_table :availabilities do |t|
      t.belongs_to :session, null: false, foreign_key: true
      t.belongs_to :registration, null: false, foreign_key: true
      t.string :role

      t.timestamps

      t.index %i(registration_id session_id role), unique: true
    end
  end
end
