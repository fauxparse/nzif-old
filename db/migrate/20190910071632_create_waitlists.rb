class CreateWaitlists < ActiveRecord::Migration[6.0]
  def change
    create_table :waitlists do |t|
      t.belongs_to :session, null: false, foreign_key: { on_delete: :cascade }
      t.belongs_to :registration, null: false, foreign_key: { on_delete: :cascade }
      t.integer :position

      t.timestamps

      t.index %i[session_id registration_id], unique: true
    end
  end
end
