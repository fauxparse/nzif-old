class AddRolesToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :authorised_roles, :string, array: true, default: []
  end
end
