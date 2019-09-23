class InstallSearchExtensions < ActiveRecord::Migration[6.0]
  def up
    History::Item.connection.execute <<~SQL
      CREATE EXTENSION pg_trgm;
      CREATE EXTENSION unaccent;
    SQL
  end

  def down
    History::Item.connection.execute <<~SQL
      DROP EXTENSION pg_trgm;
      DROP EXTENSION unaccent;
    SQL
  end
end
