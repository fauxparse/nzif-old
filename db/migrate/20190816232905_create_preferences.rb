class CreatePreferences < ActiveRecord::Migration[6.0]
  def change
    create_table :preferences do |t|
      t.belongs_to :registration, null: false, foreign_key: true
      t.belongs_to :session, null: false, foreign_key: true
      t.integer :position
      t.timestamp :starts_at

      t.timestamps
    end
  end
end
