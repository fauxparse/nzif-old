# rubocop:disable Rails/CreateTableWithTimestamps
class CreateCalendarExclusions < ActiveRecord::Migration[6.0]
  def change
    create_table :calendar_exclusions do |t|
      t.belongs_to :session, null: false, foreign_key: { on_delete: :cascade }
      t.belongs_to :registration, null: false, foreign_key: { on_delete: :cascade }
      t.index %i(registration_id session_id), unique: true
    end
  end
end
# rubocop:enable Rails/CreateTableWithTimestamps
