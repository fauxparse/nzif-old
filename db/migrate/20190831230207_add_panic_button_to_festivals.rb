class AddPanicButtonToFestivals < ActiveRecord::Migration[6.0]
  def change
    add_column :festivals, :panic, :boolean, default: false
  end
end
