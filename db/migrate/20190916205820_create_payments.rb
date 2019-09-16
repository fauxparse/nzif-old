class CreatePayments < ActiveRecord::Migration[6.0]
  def change
    create_table :payments do |t|
      t.string :type
      t.belongs_to :registration, null: false, foreign_key: true
      t.integer :amount_cents
      t.string :state, null: false, default: 'pending'
      t.string :reference

      t.timestamps
    end
  end
end
