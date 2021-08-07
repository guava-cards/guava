class CreateInvites < ActiveRecord::Migration[6.1]
  def change
    create_enum :invite_status, %w[sent rejected accepted]
    create_table :invites do |t|
      t.belongs_to :invitable, null: false, polymorphic: true
      t.bigint :sender_id, null: false
      t.bigint :recipient_id, null: true
      t.string :email
      t.string :token, null: false, unique: true
      t.enum :status, as: :invite_status, default: :sent, null: false
      t.datetime :email_sent_at
      t.datetime :expires_at

      t.timestamps
    end

    add_foreign_key :invites, :users, column: :sender_id
    add_foreign_key :invites, :users, column: :recipient_id
  end
end
