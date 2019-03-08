class AddNameToPitches < ActiveRecord::Migration[5.2]
  def change
    add_column :pitches, :name, :string
  end
end
