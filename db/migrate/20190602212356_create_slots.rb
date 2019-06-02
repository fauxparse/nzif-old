class CreateSlots < ActiveRecord::Migration[6.0]
  def change
    create_table :slots do |t|
      t.belongs_to :festival, null: false, foreign_key: {  on_delete: :cascade }
      t.timestamp :starts_at
      t.timestamp :ends_at
      t.string :activity_type

      t.index %i[festival_id activity_type starts_at], unique: true
    end
  end
end
