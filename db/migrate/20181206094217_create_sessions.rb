class CreateSessions < ActiveRecord::Migration[5.2]
  def change
    create_table :sessions do |t|
      t.belongs_to :activity, foreign_key: { on_delete: :cascade }
      t.timestamp :starts_at
      t.timestamp :ends_at

      t.timestamps

      t.index %i(starts_at ends_at)
    end
  end
end
