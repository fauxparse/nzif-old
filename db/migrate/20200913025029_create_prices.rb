class CreatePrices < ActiveRecord::Migration[6.0]
  def change
    create_table :prices do |t|
      t.belongs_to :festival, null: false, foreign_key: true
      t.string :activity_type
      t.integer :quantity
      t.integer :amount_cents

      t.timestamps
    end
  end
end
