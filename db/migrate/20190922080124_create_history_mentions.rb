class CreateHistoryMentions < ActiveRecord::Migration[6.0]
  def change
    # rubocop:disable Rails/CreateTableWithTimestamps
    create_table :history_mentions do |t|
      t.references :item,
        null: false,
        foreign_key: { to_table: :history_items, on_delete: :cascade }
      t.references :subject, polymorphic: true, null: false
      t.string :relationship

      t.index %i(item_id relationship)
    end
    # rubocop:enable Rails/CreateTableWithTimestamps
  end
end
