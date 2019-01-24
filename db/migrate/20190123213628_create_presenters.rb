class CreatePresenters < ActiveRecord::Migration[5.2]
  def change
    create_table :presenters do |t|
      t.belongs_to :activity, foreign_key: true
      t.belongs_to :user, foreign_key: true
      t.integer :position

      t.timestamps
    end
  end
end
