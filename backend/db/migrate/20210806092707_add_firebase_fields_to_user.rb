class AddFirebaseFieldsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :firebase_uid, :string, unique: true
  end
end
