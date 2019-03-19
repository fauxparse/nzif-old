class AddUidToIdentities < ActiveRecord::Migration[6.0]
  def change
    change_table :identities do |t|
      t.string :uid, limit: 64

      t.index %i[type uid], unique: true
    end
  end
end
