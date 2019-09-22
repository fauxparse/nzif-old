class CreateHistoryItems < ActiveRecord::Migration[6.0]
  def change
    # rubocop:disable Rails/CreateTableWithTimestamps
    create_table :history_items do |t|
      t.string :type
      t.string :description
      t.text :data
      t.timestamp :created_at
    end
    # rubocop:enable Rails/CreateTableWithTimestamps
  end
end
