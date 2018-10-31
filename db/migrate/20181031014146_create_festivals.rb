class CreateFestivals < ActiveRecord::Migration[5.2]
  def change
    create_table :festivals do |t| # rubocop:disable Rails/CreateTableWithTimestamps
      t.date :start_date, required: true
      t.date :end_date, required: true
    end
  end
end
