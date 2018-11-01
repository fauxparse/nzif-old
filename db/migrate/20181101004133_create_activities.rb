class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.belongs_to :festival, foreign_key: { on_delete: :cascade }
      t.string :type, required: true
      t.string :name, required: true
      t.string :slug, required: true
      t.text :description

      t.timestamps

      t.index %w(festival_id type slug)
    end
  end
end
