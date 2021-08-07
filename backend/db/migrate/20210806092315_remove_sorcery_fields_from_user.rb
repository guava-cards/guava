class RemoveSorceryFieldsFromUser < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :crypted_password, :string
    remove_column :users, :salt, :string
    remove_column :users, :access_count_to_reset_password_page, :integer
    remove_column :users, :activation_state, :string
    remove_column :users, :activation_token, :string
    remove_column :users, :activation_token_expires_at, :datetime
    remove_column :users, :reset_password_token, :string
    remove_column :users, :reset_password_token_expires_at, :datetime
    remove_column :users, :reset_password_email_sent_at, :datetime
  end
end
