class CreatePitches < ActiveRecord::Migration[5.2]
  def change
    create_table :pitches do |t|
      t.belongs_to :festival, foreign_key: { on_delete: :cascade }
      t.belongs_to :user, foreign_key: { on_delete: :cascade }
      t.string :state, null: false, default: 'draft'
      t.text :data, null: false, default: '{}'

      t.timestamps

      t.index %i(festival_id user_id state)
    end
  end
end
