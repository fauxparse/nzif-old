class FixVenueForeignKey < ActiveRecord::Migration[6.0]
  def up
    remove_foreign_key :sessions, :venues
    add_foreign_key :sessions, :venues, on_delete: :nullify
  end

  def down
    remove_foreign_key :sessions, :venues
    add_foreign_key :sessions, :venues, on_delete: :cascade
  end
end
