class CreateContents < ActiveRecord::Migration[6.0]
  def change
    create_table :contents do |t|
      t.string :slug
      t.text :raw
      t.timestamps

      t.index :slug, unique: true
    end
  end
end
