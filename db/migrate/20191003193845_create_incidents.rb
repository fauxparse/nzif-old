class CreateIncidents < ActiveRecord::Migration[6.0]
  def change
    create_table :incidents do |t|
      t.belongs_to :festival, null: false, foreign_key: { on_delete: :cascade }
      t.belongs_to :user, null: true, foreign_key: true
      t.text :body
      t.string :state, null: false, default: 'open'

      t.timestamps

      t.index %i(festival_id state)
    end
  end
end
