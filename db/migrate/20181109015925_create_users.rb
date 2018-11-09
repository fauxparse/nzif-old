class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :name
      t.string :email

      t.timestamps
      t.index 'lower((email)::text)', name: 'index_users_on_lowercase_email', unique: true
    end
  end
end
