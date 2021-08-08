# == Schema Information
#
# Table name: decks
#
#  id              :bigint           not null, primary key
#  description     :string
#  emoji           :text
#  emoji_alt       :string
#  name            :string           not null
#  visibility_mode :enum             default("private"), not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  user_id         :bigint           not null
#
# Indexes
#
#  index_decks_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
require 'rails_helper'

RSpec.describe Deck, type: :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
