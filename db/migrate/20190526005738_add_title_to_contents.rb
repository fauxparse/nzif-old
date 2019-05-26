class AddTitleToContents < ActiveRecord::Migration[6.0]
  def change
    add_column :contents, :title, :string
  end
end
