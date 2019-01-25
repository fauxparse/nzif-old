class CreateVenues < ActiveRecord::Migration[5.2]
  def change
    create_table :venues do |t|
      t.string :name, required: true
      t.string :address, required: true
      t.decimal :latitude, precision: 15, scale: 10, required: true
      t.decimal :longitude, precision: 15, scale: 10, required: true

      t.timestamps

      t.index %i(latitude longitude)
    end

    change_table :sessions do |t|
      t.belongs_to :venue, foreign_key: { on_delete: :cascade }
    end
  end
end
