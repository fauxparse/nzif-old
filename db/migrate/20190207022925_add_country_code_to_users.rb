class AddCountryCodeToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :city, :string
    add_column :users, :country_code, :string, limit: 4
  end
end
