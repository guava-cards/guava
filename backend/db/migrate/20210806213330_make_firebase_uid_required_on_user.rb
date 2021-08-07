class MakeFirebaseUidRequiredOnUser < ActiveRecord::Migration[6.1]
  def change
    change_column_null :users, :firebase_uid, false
  end
end
