class IndexFestivalsByYear < ActiveRecord::Migration[5.2]
  def up
    execute <<~SQL
      CREATE UNIQUE INDEX festivals_by_year ON festivals(extract(year from start_date));
    SQL
  end

  def down
    execute <<~SQL
      DROP INDEX festivals_by_year;
    SQL
  end
end
