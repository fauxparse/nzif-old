class CreateStripeCustomers < ActiveRecord::Migration[6.0]
  def change
    create_table :stripe_customers do |t|
      t.belongs_to :user, null: false, foreign_key: { on_delete: :cascade }
      t.string :stripe_customer_id

      t.timestamps

      t.index :stripe_customer_id, unique: true
    end
  end
end
