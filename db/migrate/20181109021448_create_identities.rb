class CreateIdentities < ActiveRecord::Migration[5.2]
  def change
    create_table :identities do |t|
      t.belongs_to :user, foreign_key: { on_delete: :cascade }
      t.string :type
      t.string :password_digest

      t.timestamps
    end
  end
end
