class CreatePlacements < ActiveRecord::Migration[6.0]
  def up
    create_table :placements do |t|
      t.belongs_to :registration, null: false, foreign_key: { on_delete: :cascade }
      t.belongs_to :session, null: false, foreign_key: { on_delete: :cascade }

      t.timestamps
    end

    add_column :registrations, :placements_count, :integer, default: 0

    add_column :sessions, :placements_count, :integer, default: 0
  end

  def down
    remove_column :registrations, :placements_count, :integer, default: 0

    remove_column :sessions, :placements_count, :integer, default: 0

    drop_table :placements
  end
end
