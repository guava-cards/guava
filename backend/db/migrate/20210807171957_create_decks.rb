class CreateDecks < ActiveRecord::Migration[6.1]
  def change
    enable_extension 'plpgsql'
    create_enum :deck_visibility_modes, %i[
      private
      invite_only
      unlisted
      public
    ]

    create_table :decks do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :name, null: false
      t.text :emoji
      t.string :emoji_alt
      t.string :description
      t.enum :visibility_mode, as: :deck_visibility_modes, default: :private, null: false

      t.timestamps
    end
  end
end
